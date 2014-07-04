#!/bin/sh

(

# Install additional packages
yum -y install gcc make gcc-c++ kernel-devel zlib-devel openssl-devel readline-devel sqlite-devel perl wget dkms nfs-utils

# Install guest additions
cd /tmp
wget http://download.virtualbox.org/virtualbox/4.2.8/VBoxGuestAdditions_4.2.8.iso
mount -o loop VBoxGuestAdditions_4.2.8.iso /mnt
sh /mnt/VBoxLinuxAdditions.run

# Delete iso
umount /mnt
rm VBoxGuestAdditions_4.2.8.iso

# Add mount points if any

<#if shares??>
  <#list shares as share>

mkdir -p ${share.mount}
echo -e "${share.name}\t\t${share.mount}\tvboxsf\tdefaults\t0 0" >> /etc/fstab
mount ${share.mount}

  </#list>
</#if>

) > /var/log/comodit/virtualbox/install.log 2>&1
