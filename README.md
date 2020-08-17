# Complete Intro to Docker Notes

[Notes](https://btholt.github.io/complete-intro-to-containers/)

Handy commands:

\$ docker build -t [APP-NAME] .

\$ docker run --init --rm -p [PORT]:[PORT][app-name]

\$ docker run -it [container:version] //run the image and
put you on the cmd line

\$ docker image prune - remove all images stored on computer

-it === interactive

--init - enable ^C out of node process

//fake hacker container
sudo docker run -it jturpin/hollywood hollywood

Honestly, there's no single concept of a "container": it's just using a few features of Linux together to achieve isolation. That's it.

What are the options for deploying?
**Bare Metal** - running/maintaining your own servers

** VMs ** - 1 server with multiple different OSs running...easy to scale up and down. Still have to manage hardware and OS and drivers, but have the power to scale up/down. Big security flaws...can overwork the server ("fork bomb"), taking up resources on a 'shared-tenant' server . **VMs are still valid**

**Public Cloud** - never have to worry about hardware or pay people to manage physical farms - still need to manage the OS, apply security updates, etc.

** Containers ** - give us many of the security and resource-management features of VMs but without the cost of having to run a whole other operating system. It instead uses chroot, namespace, and cgroup to separate a group of processes from each other. The processes can't see, interact, or know that other processes exist

---

3 Core parts of the Linux Kernel make up containers (docker manages all 3 steps for us)

1 - chroot - a Linux command that allows you to set the root directory of a new process. The new container group of processes can't see anything outside of it, eliminating our security problem because the new process has no visibility outside of its new root.

- create a new docker container with ubuntu installed and show the command line:
  \$ docker run -it --name docker-host --rm --privileged ubuntu:bionic

You need to bring/cp everything (cat, ls, cp, etc) over manually when sitting in and chroot'd directory because it think that root is '/' (because it cant read outside of itself to get to any binary that exists outside

- To check which version of linux your container is using run:
  \$ cat /etc/issue
  // Ubuntu 18.04.4 LTS \n \l
  CHROOT'd directories can still potentially see the running processes via 'ps'
  ENTER:

2 - Namespaces - limiting the visibility of containerized/chroot'd directories. The host can see children, but children can't see outside of themselves

//this will connect to the same docker environment/container
\$ docker exec -it docker-host bash
// 'ps aux' will list processes and you can 'kill any of them

//use debootstrap to setup a chrootable environment with basic tool needed
\$ debootstrap --variant=minbase bionic /better-root

[UNSHARE](https://btholt.github.io/complete-intro-to-containers/namespaces#safety-with-namespaces)

To create a chroot'd environment now that's isolated using namespaces using a new command: unshare. unshare creates a new isolated namespace from its parent (so you, the server provider can't spy on Bob nor Alice either) and all other future tenants. Run this:

//to unshare the namespaces and chroot
\$ unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash

//ps aux - results in a error to mount things

//to mount needed proceses
$ mount -t proc none /proc
$ mount -t sysfs none /sys
\$ mount -t tmpfs none /tmp

This will create a new environment that's isolated on the system with its own PIDs, mounts (like storage and volumes), and network stack. Now we can't see any of the processes!

3 - [cgroups](https://btholt.github.io/complete-intro-to-containers/cgroups) - ADVANCED STUFF

Every isolated environment has access to all physical resources of the server. There's no isolation of physical components from these environments.

Enter the hero of this story: cgroups, or control groups. Google saw this same problem when building their own infrastructure and wanted to protect runaway processes from taking down entire servers and made this idea of cgroups so you can say "this isolated environment only gets so much CPU, so much memory, etc. and once it's out of those it's out-of-luck, it won't get any more."
