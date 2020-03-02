<?php

namespace App\Repository;

use App\Entity\Fugitif;
use App\Entity\Search;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Fugitif|null find($id, $lockMode = null, $lockVersion = null)
 * @method Fugitif|null findOneBy(array $criteria, array $orderBy = null)
 * @method Fugitif[]    findAll()
 * @method Fugitif[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FugitifRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fugitif::class);
    }

    /**
     *  @return Fugitif[]|null Returns an array of Fugitif objects
     */
    public function findSearch(Search $search) : ?array
    {
        $query = $this->createQueryBuilder('f')
            ->orderBy('f.id', 'ASC')
            //->setMaxResults(10)
        ;

        if ($search->field) {        
            switch($search->field){
                case Search::FIELD_NOM:
                    $query
                        ->where('UPPER(f.nom) LIKE UPPER(:searchTerm)')
                        ->setParameter('searchTerm', "%".$search->q."%")
                    ;
                break;
                case Search::FIELD_PRENOMS:
                    $query
                        ->where('UPPER(f.prenoms) LIKE UPPER(:searchTerm)')
                        ->setParameter('searchTerm', "%".$search->q."%")
                    ;
                break;
                case Search::FIELD_ADRESSE:
                    $query
                        ->where('UPPER(f.adresse) LIKE UPPER(:searchTerm)')
                        ->setParameter('searchTerm', "%".$search->q."%")
                    ;
                break;
                case Search::FIELD_EXECUTE:
                    $query
                        ->join("f.mandats", "m")
                        ->where('m.execute = :searchTerm')
                        ->setParameter('searchTerm', $search->q ? $search->q : 1)
                    ;
                break;
                case Search::FIELD_JURIDICTION:
                    $query
                        ->join("f.mandats", "m")
                        ->where('UPPER(m.juridictions) LIKE UPPER(:searchTerm)')
                        ->setParameter('searchTerm', "%".$search->q."%")
                    ;
                break;
                case Search::FIELD_NATIONALITE:
                    $nats = explode("|", $search->q);
                    $query
                        ->join("f.listeNationalites", "fn")
                        ->join("fn.nationalite", "n");

                    $i = 0;
                    foreach ($nats as $nat) {
                        # code...
                        $query->orWhere('UPPER(n.libelle) LIKE UPPER(:searchTerm)');
                        $query->setParameter('searchTerm', "%".$nat."%");
                    }
                    ;
                break;
                case Search::FIELD_INFRACTIONS:
                    $query
                        ->join("f.mandats", "m")
                        ->where('UPPER(m.infractions) LIKE UPPER(:searchTerm)')
                        ->setParameter('searchTerm', "%".$search->q."%")
                    ;
                break;
                default:
                    return null;
                    // $query
                    //     ->orWhere('UPPER(f.nom) LIKE UPPER(:searchTerm)')
                    //     ->setParameter('searchTerm', "%".$search->q."%")

                    //     ->orWhere('UPPER(f.prenoms) LIKE UPPER(:searchTerm)')
                    //     ->setParameter('searchTerm', "%".$search->q."%")

                    //     ->orWhere('UPPER(f.adresse) LIKE UPPER(:searchTerm)')
                    //     ->setParameter('searchTerm', "%".$search->q."%")
                    // ;
                    //return [];
            }
        } else {

            $values = explode("|", $search->q);

            foreach ($values as $value) {
                # code...
                $query
                ->orWhere('UPPER(f.nom) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%")

                ->orWhere('UPPER(f.prenoms) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%")

                ->orWhere('UPPER(f.adresse) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%")

                ->join("f.mandats", "m")
                ->orWhere('UPPER(m.juridictions) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%")

            
                ->join("f.listeNationalites", "fn")
                ->join("fn.nationalite", "n")
                ->orWhere('UPPER(n.libelle) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%")
            
                ->join("f.mandats", "ma")
                ->orWhere('UPPER(ma.infractions) LIKE UPPER(:searchTerm)')
                ->setParameter('searchTerm', "%".$value."%");
            }

                // ->orWhere('UPPER(f.nom) LIKE UPPER(:searchTerm)')
                // ->setParameter('searchTerm', "%".$search->q."%")
        }
        
        //dd($query);
        
        return $query->getQuery()->getResult();
    }

    // /**
    //  * @return Fugitif[] Returns an array of Fugitif objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Fugitif
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
