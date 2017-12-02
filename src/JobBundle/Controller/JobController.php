<?php
namespace JobBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

use JobBundle\Entity\Jobs;

/**
 * Job controller.
 *
 * @Route("/job")
 *
 * @package JobBundle\Controller
 */
class JobController extends FOSRestController
{
    /**
    * listar
    * @Rest\Get("/job")
    */
    public function getAction() {
      $restresult = $this->getDoctrine()->getRepository('JobBundle:Jobs')->findAll();
      if ($restresult === null) {
        return new View("there are no job exist", Response::HTTP_NOT_FOUND);
      }
      return new View($restresult, Response::HTTP_OK);
    }

    /**
    * ver
    * @Rest\Get("/job/{id}")
    */
    public function idAction(int $id) {
      $singleresult = $this->getDoctrine()->getRepository('JobBundle:Jobs')->find($id);
      if ($singleresult === null) {
        return new View("job not found", Response::HTTP_NOT_FOUND);
      }
      return new View($singleresult, Response::HTTP_OK);
    }

    /**
    * insertar
    * @Rest\Post("/job/")
    */
    public function postAction(Request $request) {
      $data = new Jobs;
      $name = $request->get('name');
      if(empty($name)) {
        return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
      }
      $data->setName($name);
      $em = $this->getDoctrine()->getManager();
      $em->persist($data);
      $em->flush();
      return new View($data, Response::HTTP_OK);
    }

    /**
    * actualizar
    * @Rest\Put("/job/{id}")
    */
    public function updateAction(Request $request, int $id) {
      $name = $request->get('name');
      if(empty($name)) {
        return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
      }
      $data = new Jobs;
      $sn = $this->getDoctrine()->getManager();
      $job = $this->getDoctrine()->getRepository('JobBundle:Jobs')->find($id);
      if (empty($job)) {
        return new View("job not found", Response::HTTP_NOT_FOUND);
      }
      $job->setName($name);
      $sn->flush();
      return new View($job, Response::HTTP_OK);
    }

    /**
    * borrar
    * @Rest\Delete("/job/{id}")
    */
    public function deleteAction($id) {
      $data = new Jobs;
      $sn = $this->getDoctrine()->getManager();
      $job = $this->getDoctrine()->getRepository('JobBundle:Jobs')->find($id);
      if (empty($job)) {
        return new View("job not found", Response::HTTP_NOT_FOUND);
      }
      $sn->remove($job);
      $sn->flush();
      return new View($job, Response::HTTP_OK);
    }
}
