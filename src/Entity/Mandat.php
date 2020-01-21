<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MandatRepository")
 * @ORM\Table(schema="metier")
 * @ORM\HasLifecycleCallbacks()
 */
class Mandat
{
    use TimestampTrait;
    
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("search:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("search:read")
     */
    private $reference;

    /**
     * @ORM\Column(type="boolean")
     * @Groups("search:read")
     */
    private $execute;

    /**
     * @ORM\Column(type="text")
     * @Groups("search:read")
     */
    private $infractions;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("search:read")
     */
    private $chambres;

    /**
     * @ORM\Column(type="text")
     * @Groups("search:read")
     */
    private $juridictions;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TypeMandat")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("search:read")
     */
    private $typeMandat;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Fugitif", inversedBy="mandats")
     * @ORM\JoinColumn(nullable=false)
     */
    private $fugitif;
    
    /**
     * @ORM\Column(type="date", name="date_emission", nullable=true)
     * @Groups("search:read")
     */
    private $dateEmission;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getExecute(): ?bool
    {
        return $this->execute;
    }

    public function setExecute(bool $execute): self
    {
        $this->execute = $execute;

        return $this;
    }

    public function getInfractions(): ?string
    {
        return $this->infractions;
    }

    public function setInfractions(string $infractions): self
    {
        $this->infractions = $infractions;

        return $this;
    }

    public function getChambres(): ?string
    {
        return $this->chambres;
    }

    public function setChambres(?string $chambres): self
    {
        $this->chambres = $chambres;

        return $this;
    }

    public function getJuridictions(): ?string
    {
        return $this->juridictions;
    }

    public function setJuridictions(string $juridictions): self
    {
        $this->juridictions = $juridictions;

        return $this;
    }

    public function getTypeMandat(): ?TypeMandat
    {
        return $this->typeMandat;
    }

    public function setTypeMandat(?TypeMandat $typeMandat): self
    {
        $this->typeMandat = $typeMandat;

        return $this;
    }

    public function getFugitif(): ?Fugitif
    {
        return $this->fugitif;
    }

    public function setFugitif(?Fugitif $fugitif): self
    {
        $this->fugitif = $fugitif;

        return $this;
    }

    public function getDateEmission(): ?\DateTimeInterface
    {
        return $this->dateEmission;
    }

    public function setDateEmission(\DateTimeInterface $dateEmission): self
    {
        $this->dateEmission = $dateEmission;

        return $this;
    }
}
