<?php

namespace App\Controller;

use App\Entity\Fugitif;
use App\Entity\Mandat;
use App\Entity\Nationalite;
use App\Entity\NationaliteFugitif;
use App\Entity\TypeMandat;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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

    /**
     * @Route("/update", name = "data_update_path", methods="POST")
     */

    public function update(Request $request, EntityManagerInterface $em) : Response
    {
        
    }

    /**
     * @Route("/{entity}", name = "entity_path", methods="GET")
     */
    public function findClassObjects(Request $request, $entity){

        $entity = "App\\Entity\\".$entity;

        if (!class_exists($entity)){
            $message = "Erreur : Cette classe n'existe pas !";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        $data = $this->getDoctrine()
                            ->getManager()
                            ->getRepository($entity)
                            ->findAll();
                            
        return $this->json($data, Response::HTTP_OK, []);
    }

    /**
     * @Route("/delete", name = "data_deletion_path", methods="POST")
     */

    public function delete(Request $request, EntityManagerInterface $em) : Response
    {
        $params = json_decode($request->getContent(), true);

        if ($params == null){
            $message = "Bad request";
            return $this->json($message, Response::HTTP_BAD_REQUEST);
        }

        $className = $params["class"];
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
     * @Route("/add", name = "data_addition_path", methods="POST")
     */

    public function add(Request $request, EntityManagerInterface $em) : Response
    {

        //$em = $this->getDoctrine()
        //           ->getManager();

        $reqContent = json_decode($request->getContent(), true);

        dd($reqContent);
        $mandat = $this->getMandat($reqContent, $em);

        $jsonResponse = null;

        // try {

            //code...
            $em->persist($mandat);
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

    private function getMandat(Array $reqContent, EntityManager $em){

        // initializing the mandat object
        $mandat = new Mandat();
        
        // retreiving the mandat properties' value from the request
        $reference = $reqContent["reference"];
        $infractions = $reqContent["infractions"];
        $juridictions = $reqContent["juridictions"];
        $execute = $reqContent["execute"];
        $chambres = $reqContent["chambres"];
        $dateEmission = $reqContent["dateemission"];

        // var_dump($request);

        $typeMandat = $this->getTypeMandat($reqContent, $em);
        $fugitif = $this->getFugitif($reqContent, $em);

        $mandat->setReference($reference);
        $mandat->setInfractions($infractions);
        $mandat->setJuridictions($juridictions);
        $mandat->setExecute($execute);
        $mandat->setChambres($chambres);
        $mandat->setDateEmission(new \DateTime($dateEmission));

        $mandat->setTypeMandat($typeMandat);
        $mandat->setFugitif($fugitif);

        return $mandat;

    }

    private function getTypeMandat(Array $reqContent, EntityManager $em){

        $libelle = $reqContent["typemandat"];

        $typeMandat = $em->getRepository(TypeMandat::class)
                            ->findOneBy(["libelle" => $libelle]);

        if ($typeMandat === null){
            $typeMandat = new TypeMandat();
            $typeMandat->setLibelle($libelle);
        }
        return $typeMandat;
    }

    private function getNationalite(Array $reqContent, EntityManager $em){
        
        $libelle = $reqContent["nationalite"];

        $nationalite = $em->getRepository(Nationalite::class)
                            ->findOneBy(["libelle" => $libelle]);

        if ($nationalite === null){
            $nationalite = new Nationalite();
            $nationalite->setLibelle($libelle);
        }
        return $nationalite;

    }

    private function getFugitif(Array $reqContent, EntityManager $em){

        // retreiving fugitif object's properties values
        $nom = $reqContent["nom"];
        $prenoms = $reqContent["prenoms"];
        $nomMarital = $reqContent["nommarital"];
        $alias = $reqContent["alias"];
        $surnom = $reqContent["surnom"];
        $adresse = $reqContent["taille"];
        $poids = $reqContent["poids"];
        $sexe = $reqContent["sexe"];
        $observations = $reqContent["observations"];
        $numeroTelephone = $reqContent["numerotelephone"];
        $numeroPieceID = $reqContent["numeropieceid"];
        $couleurPeau = $reqContent["couleurpeau"];
        $couleurYeux = $reqContent["couleuryeux"];
        $couleurCheveux = $reqContent["couleurcheveux"];
        $dateNaissance = $reqContent["datenaissance"];
        $lieuNaissance = $reqContent["lieunaissance"];

        $fugitif = new Fugitif();
        $fugitif->setNom($nom);
        $fugitif->setPrenoms($prenoms);
        $fugitif->setDateNaissance(new \DateTime($dateNaissance));
        $fugitif->setLieuNaissance($lieuNaissance);
        $fugitif->setCouleurYeux($couleurYeux);
        $fugitif->setCouleurPeau($couleurPeau);
        $fugitif->setCouleurCheveux($couleurCheveux);
        $fugitif->setSexe($sexe);
        $fugitif->setPoids($poids);
        $fugitif->setAdresse($adresse);
        $fugitif->setSurnom($surnom);
        $fugitif->setAlias($alias);
        $fugitif->setNomMarital($nomMarital);
        $fugitif->setObservations($observations);
        $fugitif->setNumeroPieceID($numeroPieceID);
        $fugitif->setNumeroTelephone($numeroTelephone);

        $nationalite = $this->getNationalite($reqContent, $em);

        $natFugitif = new NationaliteFugitif();
        $natFugitif->setNationalite($nationalite);

        $fugitif->addListeNationalite($natFugitif);

        return $fugitif;
    }
}