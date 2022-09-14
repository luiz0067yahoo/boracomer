sudo groupadd --system prometheus
sudo useradd -s /sbin/nologin --system -g prometheus prometheus
sudo mkdir /var/lib/prometheus
for i in rules rules.d files_sd; do sudo mkdir -p /etc/prometheus/${i}; done
sudo apt update
sudo apt -y install wget curl vim
mkdir -p /tmp/prometheus && cd /tmp/prometheus
curl -s https://api.github.com/repos/prometheus/prometheus/releases/latest | grep browser_download_url | grep linux-amd64 | cut -d '"' -f 4 | wget -qi -
tar xvf prometheus*.tar.gz
cd prometheus*/
sudo mv prometheus promtool /usr/local/bin/
$ prometheus --version
promtool --version
sudo mv prometheus.yml /etc/prometheus/prometheus.yml
sudo mv consoles/ console_libraries/ /etc/prometheus/
cd $HOME
sudo rm -rf /etc/prometheus/prometheus.yml
sudo touch /etc/prometheus/prometheus.yml
sudo chmod 777 /etc/prometheus/prometheus.yml
sudo wget https://raw.githubusercontent.com/luiz0067yahoo/boracomer/main/.github/workflows/prometheus.yml /etc/prometheus/prometheus.yml

sudo rm -rf /etc/systemd/system/prometheus.service
sudo touch /etc/systemd/system/prometheus.service
sudo chmod /etc/systemd/system/prometheus.service
sudo wget https://raw.githubusercontent.com/luiz0067yahoo/boracomer/main/.github/workflows/prometheus.service /etc/systemd/system/prometheus.service

for i in rules rules.d files_sd; do sudo chown -R prometheus:prometheus /etc/prometheus/${i}; done
for i in rules rules.d files_sd; do sudo chmod -R 775 /etc/prometheus/${i}; done
sudo chown -R prometheus:prometheus /var/lib/prometheus/

sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus

systemctl status prometheus
sudo ufw allow 9090/tcp
