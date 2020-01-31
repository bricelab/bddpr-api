<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;

class SecurityController extends AbstractController
{
    /**
     * @Route("/security", name="security")
     */
    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/SecurityController.php',
        ]);
    }

    /**
     * @Route("/register", name="user_registration")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
    	// retrieving data from the request object
    	$email = $request->get("email");
    	$password = $request->get("password");

    	// creating the user object to inserted in the database
    	$user = new User();
    	$user->setEmail($email);
    	$user->setPassword($passwordEncoder->encodePassword(
            $user,
            $password
        ));

    	$em = $this->getDoctrine()->getManager();
    	$em->persist($user);
    	$em->flush();

    	return new Response(sprintf("User %s successfully created", $user->getUsername()));

        // return $this->render('auth/index.html.twig', [
        //     'controller_name' => 'AuthController',
        // ]);
    }

}
