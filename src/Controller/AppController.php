<?php

namespace App\Controller;

use App\Entity\Fugitif;
use App\Entity\Mandat;
use App\Entity\Nationalite;
use App\Entity\TypeMandat;
use App\Repository\MandatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/admin/{requested_page}",
     * defaults={"requested_page": 1},
     * requirements={
     *      "requested_page": "\d+"
     * }, name="app_backend")
     */
    public function index(EntityManagerInterface $em, $requested_page)
    {
        // retrieving nationalite objects
        $nationalites = $em->getRepository(Nationalite::class)
                           ->findAll();

        $typeMandats = $em->getRepository(TypeMandat::class)
                          ->findAll();

        // $mandatRepository = $em->getRepository(Mandat::class);

        // $nbMandats = $mandatRepository->getAllMandatsCount();

        // $offset = (($requested_page - 1) * $this->getParameter("MANDAT_DISPLAY_LIMIT"));

        // $mandats = $mandatRepository->findBy([], null, $this->getParameter("MANDAT_DISPLAY_LIMIT"), $offset);

        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
            'nationalites'  =>  $nationalites,
            'typeMandats'   =>  $typeMandats,
            // 'mandats'      =>  $mandats,
            // 'pages'         =>  round($nbMandats/$this->getParameter("MANDAT_DISPLAY_LIMIT")),
        ]);
    }

    /**
     * @Route("/admin/profile", name="app_user_profile_action")
     */
    public function userProfile()
    {
        // retrieving nationalite objects

        return $this->render('app/user_profile.html.twig');
    }

    /**
     * @Route("/admin/user_password_change", name="app_user_password_change_action")
     */
    public function changePassword(Request $request, EntityManagerInterface $em)
    {
        if ($request->isMethod("POST")){

            $password1 = $request->get("password1");
            $password2 = $request->get("password2");
            
            if ($password1 !== $password2){
                $message = ["type"  =>  "danger", "content"   =>  "Incoherent inputs"];
            }
            else{
                $user = $this->getUser();
                $user->setPassword($password1);
                // dd("ok");
                $em->persist($user);
                $em->flush();
                $message = ["type"  =>  "success", "content"   =>  "Credentials updated"];
            }

        }

        return $this->render('app/user_profile.html.twig', ["message"   =>  $message]);
    }

    /**
     * @Route("/admin/mandats/{page}", name="app_mandats_fetch_action", options={"expose"=true})
     */
    public function fetchWarrants(Request $request, EntityManagerInterface $em, $page)
    {
        // if ($request->isXmlHttpRequest()){

            $mandatRepository = $em->getRepository(Mandat::class);

            $nbMandats = $mandatRepository->getAllMandatsCount();

            $offset = (($page - 1) * $this->getParameter("MANDAT_DISPLAY_LIMIT"));

            $mandats = $mandatRepository->findBy([], null, $this->getParameter("MANDAT_DISPLAY_LIMIT"), $offset);

            $data = ["mandats"  => $mandats, "pages"    =>  round($nbMandats/$this->getParameter("MANDAT_DISPLAY_LIMIT"))];
            return $this->json($data, Response::HTTP_OK, [], [ "groups" => "infos_mandat" ]);
        // }
        return new Response("Not an ajax request");
    }

    /**
     * @Route("/a-propos", name="app_about_action")
     */
    public function aboutPage()
    {
        return $this->render('about.html.twig');
    }
}
