FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2 git
RUN echo "update and install"
# Install apache and write hello world message
#RUN echo 'Hello World!' > /var/www/html/index.html
RUN  git clone https://github.com/luiz0067yahoo/boracomer.git ~/boracomer/
RUN echo "load repositorio"
RUN chmod -R 755 /var/www/html/
RUN chmod -R 755 ~/boracomer/
RUN echo "permission folder"
RUN rm -rf /var/www/html/*
RUN echo "clean server"
RUN mv ~/boracomer/* /var/www/html
RUN echo "move project"

# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
 chmod 755 /root/run_apache.sh

EXPOSE 80

RUN a2enmod rewrite
RUN echo "enabled .htaccess"
CMD /root/run_apache.sh

