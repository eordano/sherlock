Vagrant.configure(2) do |config|
  config.vm.synced_folder "./", "/var/sherlock"   # Sync'd folder
  config.vm.network :forwarded_port, host: 3000, guest: 3000

  config.vm.provider "docker" do |d|
    d.build_dir = "./Docker" # specifies the path to the Dockerfile
  end
end
