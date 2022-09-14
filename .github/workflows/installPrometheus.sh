sudo apt-get update
              echo "update system ###################################################"
              sudo apt install net-tools
              echo "install net-tools ###############################################"
              netstat -nl | grep 9323
              echo "test port 9323 ##################################################"
              sudo groupadd --system prometheus
              echo "create group user prometheus ####################################"
              sudo useradd -s /bin/false -r -g prometheus prometheus
              echo "add group sudo user prometheus ##################################"
              sudo mkdir -p /etc/prometheus
              sudo mkdir -p /var/lib/prometheus
              echo "create folder prometheus ########################################"
              sudo mkdir -p /home/${{ secrets.AWS_INSTANCE_USER }}/downloads/prometheus 
              echo "create folder download ##########################################"
              cd /home/${{ secrets.AWS_INSTANCE_USER }}/downloads/prometheus -p
              echo "open folder download ############################################"
              wget https://github.com/prometheus/prometheus/releases/download/v2.8.0/prometheus-2.8.0.linux-amd64.tar.gz
              echo "prometheus download #############################################"
              tar -zxvf prometheus-2.8.0.linux-amd64.tar.gz
              echo "extract download ################################################"
              cd prometheus-2.8.0.linux-amd64/
              echo "open download ###################################################"
              sudo install prometheus /usr/local/bin/
              echo "install prometheus ##############################################"
              sudo install promtool /usr/local/bin/
              echo "install promtool ################################################"
              sudo mv consoles /etc/prometheus/
              echo "move folder #####################################################"
              sudo mv console_libraries /etc/prometheus/
              echo "move folder ####################################################"
              cd /etc/prometheus
              echo "open prometheus folder #########################################"
              sudo rm -rf /etc/prometheus/prometheus.yml
              echo "config prometheus ##############################################"
              sudo touch /etc/prometheus/prometheus.yml
              echo "create file /etc/prometheus/prometheus.yml #####################"
              sudo chmod 777  /etc/prometheus/prometheus.yml
              echo "permission file /etc/prometheus/prometheus.yml #################"
              echo "global:" >> /etc/prometheus/prometheus.yml
              echo "  scrape_interval: 15s" >> /etc/prometheus/prometheus.yml
              echo 'scrape_configs:' >> /etc/prometheus/prometheus.yml
              echo "  - job_name: 'prometheus'" >> /etc/prometheus/prometheus.yml
              echo "    scrape_interval: 5s" >> /etc/prometheus/prometheus.yml
              echo "    static_configs:" >> /etc/prometheus/prometheus.yml
              echo "      - targets: ['localhost:9090']" >> /etc/prometheus/prometheus.yml
              echo "  - job_name: 'docker'" >> /etc/prometheus/prometheus.yml
              echo "    static_configs:" >> /etc/prometheus/prometheus.yml
              #echo "      - targets: ['${{ secrets.AWS_INSTANCE_IP }}']" >> /etc/prometheus/prometheus.yml
              #echo "      - targets: ['"${{ secrets.AWS_INSTANCE_IP }}"']" >> /etc/prometheus/prometheus.yml
              echo "      - targets: ['54.166.21.114']" >> /etc/prometheus/prometheus.yml
              echo "edit file config prometheus"
              sudo prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
              echo "active file config /etc/prometheus/prometheus.yml ##############"
              
              sudo chown prometheus:prometheus /usr/local/bin/prometheus
              sudo chown prometheus:prometheus /usr/local/bin/promtool
              sudo chown prometheus:prometheus /var/lib/prometheus -R
              sudo chmod -R 775 /etc/prometheus/ /var/lib/prometheus/
              sudo rm -rf /etc/systemd/system/prometheus.service
              sudo touch /etc/systemd/system/prometheus.service
              echo "create file /etc/systemd/system/prometheus.service #############"
              sudo chmod 7777 /etc/systemd/system/prometheus.service
              echo "permission file /etc/systemd/system/prometheus.service #########"
              sudo echo "[Unit]" >> /etc/systemd/system/prometheus.service
              sudo echo "Description=Prometheus" >> /etc/systemd/system/prometheus.service
              sudo echo "Wants=network-online.target" >> /etc/systemd/system/prometheus.service
              sudo echo "After=network-online.target" >> /etc/systemd/system/prometheus.service
              sudo echo "" >> /etc/systemd/system/prometheus.service
              sudo echo "[Service]" >> /etc/systemd/system/prometheus.service
              sudo echo "User=prometheus" >> /etc/systemd/system/prometheus.service
              sudo echo "Group=prometheus" >> /etc/systemd/system/prometheus.service
              sudo echo "Type=simple" >> /etc/systemd/system/prometheus.service
              sudo echo "ExecStart=/usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries" >> /etc/systemd/system/prometheus.service
              sudo echo "" >> /etc/systemd/system/prometheus.service
              sudo echo "[Install]" >> /etc/systemd/system/prometheus.service
              sudo echo "WantedBy=multi-user.target" >> /etc/systemd/system/prometheus.service
              sudo echo "SyslogIdentifier=prometheus" >> /etc/systemd/system/prometheus.service
              sudo echo "Restart=always" >> /etc/systemd/system/prometheus.service
              echo "active file config /etc/systemd/system/prometheus.service ######"
              
              sudo chown prometheus:prometheus /var/lib/prometheus -R
              sudo chmod 775 /var/lib/prometheus -R
              echo "permission prometheus ##########################################"
              
              sudo systemctl daemon-reload
              echo "reload prometheus ##############################################"
              sudo systemctl start prometheus
              echo "start prometheus ################################################"
              sudo echo "54.166.21.114:9090"
              sudo rm -rf /home/${{ secrets.AWS_INSTANCE_USER }}/prometheus*
              sudo rm -rf /home/${{ secrets.AWS_INSTANCE_USER }}/downloads/prometheus*
              echo "clean download and files not used ###############################"
