<?php

namespace App\Repository;

use App\Entity\Mandat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Mandat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mandat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mandat[]    findAll()
 * @method Mandat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MandatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mandat::class);
    }

    // /**
    //  * @return Mandat[] Returns an array of Mandat objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Mandat
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    /**
     * @return integer Return the count of all mandat objects
     */
    public function getAllMandatsCount()
    {
        return $this->_em->createQueryBuilder()
                            ->select('count(m)')
                            ->from($this->_entityName, 'm')
                            ->getQuery()
                            ->getSingleScalarResult()
                            ;

    }
    
}
