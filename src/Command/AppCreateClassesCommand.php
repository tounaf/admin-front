<?php

namespace App\Command;

use App\Entity\Classe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-classes',
    description: 'Add default classes',
)]
class AppCreateClassesCommand extends Command
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $classes = ['CP', 'CE1', 'CE2', 'CM1', 'CM2'];
        foreach ($classes as $name) {
            $classe = new Classe();
            $classe->setName($name);
            $this->entityManager->persist($classe);
        }

        $this->entityManager->flush();

        $io->success('Default classes created.');

        return Command::SUCCESS;
    }
}
