<?php

namespace App\Controller;

use App\Entity\Fugitif;
use App\Entity\Mandat;
use App\Entity\Nationalite;
use App\Entity\TypeMandat;
use App\Repository\MandatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/backend/{requested_page}",
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

        $mandatRepository = $em->getRepository(Mandat::class);

        $nbMandats = $mandatRepository->getAllMandatsCount();

        $offset = (($requested_page - 1) * $this->getParameter("MANDAT_DISPLAY_LIMIT")) + 1;

        $mandats = $mandatRepository->findBy([], null, $this->getParameter("MANDAT_DISPLAY_LIMIT"), $offset);

        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
            'nationalites'  =>  $nationalites,
            'typeMandats'   =>  $typeMandats,
            'mandats'      =>  $mandats,
            'pages'         =>  round($nbMandats/$this->getParameter("MANDAT_DISPLAY_LIMIT")),
        ]);
    }
}
