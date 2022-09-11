FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2 git

# Install apache and write hello world message
#RUN echo 'Hello World!' > /var/www/html/index.html
RUN cd /var/www/html/ && \
 git clone https://github.com/luiz0067yahoo/boracomer.git && \
 chmod -R 777 /var/www/html/boracomer/
#RUN mv /var/www/html/boracomer /var/www/html/

# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \ 
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \ 
 chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh
#prometheus monitoramento
