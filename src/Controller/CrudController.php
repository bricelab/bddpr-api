<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CrudController extends AbstractController
{

    // /**
    //  * @Route("/crud", name="crud")
    //  */
    // public function index()
    // {
    //     return $this->render('crud/index.html.twig', [
    //         'controller_name' => 'CrudController',
    //     ]);
    // }

    // /**
    //  * @Route("/api/update", name = "data_update_path", methods="POST")
    //  */

    // public function update(Request $request, EntityManagerInterface $em) : Response
    // {
        
    // }

    /**
     * @Route("/api/delete/{className}", name = "data_deletion_path", methods="POST")
     */

    public function delete(Request $request, EntityManagerInterface $em, $className) : Response
    {
        $params = json_decode($request->getContent(), true);

        if ($params == null){
            $message = "Bad request";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        $property = $params["property"];
        $value = $params["value"];

        $className = "App\\Entity\\".$className;
        if (!class_exists($className)){
            $message = "Erreur : Cette classe n'existe pas !";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        if (!property_exists($className, $property)){
            $message = "Erreur : Cette proprieté n'existe pas dans cette classe !";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }
    
        $item = $em->getRepository($className)->findOneBy([$property => $value]);

        if ($item == NULL){
            $message = "Erreur : Cet objet ".($property)." : ".($value)." n'existe pas !";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        try {
            //code...
            $em->remove($item);
            $em->flush();

            return $this->json("Item deleted successfully", Response::HTTP_OK, []);

        } catch (\Throwable $th) {
            //throw $th;
            return $this->json("An error occured while deleting the item with ".$property." as ".$value, Response::HTTP_BAD_REQUEST);
        }                

    }

    /**
     * @Route("/api/add/{className}", name = "data_addition_path", methods="POST")
     */

    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, $className) : Response
    {
        //$em = $this->getDoctrine()
        //           ->getManager();

        // dd($this->getNamespaceName());
        $className = "App\\Entity\\".$className;
        if (!class_exists($className)){
            $message = "Erreur : Cette classe n'existe pas !";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        // $reqContent = json_decode($request->getContent(), true);

        // dd($reqContent);
        $object = $serializer->deserialize($request->getContent(), $className, "json");

        // dd($object);
        $jsonResponse = null;

        // try {

            //code...
            $em->persist($object);
            $em->flush();

            $message = "Executed successfully";
            $jsonResponse = $this->json($message, Response::HTTP_OK);

        // } catch (\Throwable $th) {

        //     //throw $th;
        //     $message = "An error occured";
        //     $jsonResponse = $this->json($message, Response::HTTP_BAD_REQUEST);

        // }

        return $jsonResponse;
    }
}