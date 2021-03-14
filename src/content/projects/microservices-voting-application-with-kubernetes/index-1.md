---
templateKey: project
title: Microservices Voting Application With Kubernetes
order: 0
excerpt: This project was the culmination of a dedicated period of personal
  study and development in order to learn more about back end microservice
  architecture. Each service uses its own database, and data is shared between
  services asynchronously using NATS streaming server. This raises lots of
  interesting considerations around data synchronization and concurrency. No
  service has a direct dependency on any other, so downtime for any given
  service is handled and recovered from gracefully. The project uses Kubernetes
  for container orchestration and Github Actions for CI/CD. It is deployed to an
  EKS Kubernetes cluster in AWS.
tags:
  - docker
  - kubernetes
  - aws
  - nats
  - node
  - microservices
github: https://github.com/martinseanhunt/microservices-voting
liveUrl: ""
linkToDetails: false
---
This project was the culmination of a dedicated period of personal study and development in order to learn more about back end microservice architecture. Each service uses its own database, and data is shared between services asynchronously using NATS streaming server. This raises lots of interesting considerations around data synchronization and concurrency. No service has a direct dependency on any other, so downtime for any given service is handled and recovered from gracefully. The project uses Kubernetes for container orchestration and Github Actions for CI/CD. It is deployed to an EKS Kubernetes cluster in AWS.\
\
The plan is that this codebase will eventually serve as the basis for the application I put together to allow delegators to my stake pool to vote on how the charity funds will be allocated to various causes. \
\
[https://github.com/​martinseanhunt/microservices-​voting](https://github.com/martinseanhunt/microservices-voting)\
\
Note: The deployed application at [http://voting-api.mh.codes](http://voting-api/mh.codes) ​is not currently running (AWS EKS gets expensive quickly!)