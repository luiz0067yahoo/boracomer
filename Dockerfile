FROM php:8.1-apache
#####################################################################################   TIME ZONE   ##############################################################
RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime   
RUN echo "America/Sao_Paulo" > /etc/timezone     
RUN export TZ=America/Sao_Paulo   
RUN echo "timezone"
#####################################################################################   TIME ZONE   ##############################################################


#####################################################################################   INSTALL     ##############################################################

RUN apt-get update && apt-get upgrade && apt-get dist-upgrade --yes \
 && apt-get install -y \   
      apt-utils \
      autoconf \
      automake \   
      build-essential \
      bison \
      curl \
      g++ \ 
      gawk \
      git \
      imagemagick \
      libbz2-dev \
      libcurl4-openssl-dev \      
      libevent-dev \
      libffi-dev \
      libgdbm-dev \
      libglib2.0-dev \
      libgmp-dev \
      libjpeg-dev \
      libmagickcore-dev \
      libmagickwand-dev \
      libmysqlclient-dev \
      libncurses-dev \
      libncurses5-dev \
      libpq-dev \
      libreadline-dev \
      libsqlite3-dev \
      libssl-dev \
      libxml2-dev \
      libxslt-dev \
      libyaml-dev \
      make \
      patch \
      software-properties-common \
      zlib1g-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
 RUN echo "install basic"
#####################################################################################   INSTALL     ##############################################################

#####################################################################################   INSTALL NODE ##############################################################

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get --yes  install nodejs
RUN ln -sf /usr/bin/nodejs /usr/local/bin/node   
RUN node -v
RUN echo "Install Node"
#####################################################################################   INSTALL NODE ##############################################################

#####################################################################################   CONFIG      ##############################################################
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
VOLUME ["/var/www/html/storage/logs"]

RUN docker-php-ext-install mysqli pdo_mysql zip 

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php && rm composer-setup.php && mv composer.phar /usr/local/bin/composer && chmod a+x /usr/local/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_16.x
RUN apt-get install -y nodejs
RUN apt-get install -y npm build-essential

RUN npm install -g n
RUN n v16
RUN npm update -g
RUN n prune

ENV COMPOSER_ALLOW_SUPERUSER 1

WORKDIR /var/www/html
#####################################################################################   CONFIG      ##############################################################



//COPY . /var/www/html/.
RUN  git clone https://github.com/luiz0067yahoo/boracomer.git ~/boracomer/
RUN chmod o+w ./storage/ -R
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
EXPOSE 443

RUN a2enmod rewrite
RUN echo "enabled .htaccess"
CMD /root/run_apache.sh

