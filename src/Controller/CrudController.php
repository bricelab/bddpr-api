<?php

namespace App\Controller;

use App\Entity\Fugitif;
use App\Entity\Mandat;
use App\Entity\Nationalite;
use App\Entity\NationaliteFugitif;
use App\Entity\TypeMandat;
use Doctrine\ORM\EntityManager;
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
     * @Route("/data", name = "api_add_path")
     */

    public function add(Request $request) : Response
    {

        $em = $this->getDoctrine()
                   ->getManager();

        $mandat = $this->getMandat($request, $em);

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

    private function getMandat(Request $request, EntityManager $em){

        // initializing the mandat object
        $mandat = new Mandat();
        
        // retreiving the mandat properties' value from the request
        $reference = $request->get("reference");
        $infractions = $request->get("infractions");
        $juridictions = $request->get("juridictions");
        $execute = $request->get("execute");
        $chambres = $request->get("chambres");
        $dateEmission = $request->get("dateemission");

        $typeMandat = $this->getTypeMandat($request, $em);
        $fugitif = $this->getFugitif($request, $em);

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

    private function getTypeMandat(Request $request, EntityManager $em){

        $libelle = $request->get("typemandat");

        $typeMandat = $em->getRepository(TypeMandat::class)
                            ->findOneBy(["libelle" => $libelle]);

        if ($typeMandat === null){
            $typeMandat = new TypeMandat();
            $typeMandat->setLibelle($libelle);
        }
        return $typeMandat;
    }

    private function getNationalite(Request $request, EntityManager $em){
        
        $libelle = $request->get("nationalite");

        $nationalite = $em->getRepository(Nationalite::class)
                            ->findOneBy(["libelle" => $libelle]);

        if ($nationalite === null){
            $nationalite = new Nationalite();
            $nationalite->setLibelle($libelle);
        }
        return $nationalite;

    }

    private function getFugitif(Request $request, EntityManager $em){

        // retreiving fugitif object's properties values
        $nom = $request->get("nom");
        $prenoms = $request->get("prenoms");
        $nomMarital = $request->get("nommarital");
        $alias = $request->get("alias");
        $surnom = $request->get("surnom");
        $adresse = $request->get("taille");
        $poids = $request->get("poids");
        $sexe = $request->get("sexe");
        $observations = $request->get("observations");
        $numeroTelephone = $request->get("numerotelephone");
        $numeroPieceID = $request->get("numeropieceid");
        $couleurPeau = $request->get("couleurpeau");
        $couleurYeux = $request->get("couleuryeux");
        $couleurCheveux = $request->get("couleurcheveux");
        $dateNaissance = $request->get("datenaissance");
        $lieuNaissance = $request->get("lieunaissance");

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

        $nationalite = $this->getNationalite($request, $em);

        $natFugitif = new NationaliteFugitif();
        $natFugitif->setNationalite($nationalite);

        $fugitif->addListeNationalite($natFugitif);

        return $fugitif;
    }
}