lowercase(){
	echo "$1" | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/"
}

# Adapted from https://github.com/coto/server-easy-install/blob/master/lib/core.sh
installPackages(){
    OS=`lowercase \`uname\``
	KERNEL=`uname -r`
	MACH=`uname -m`
    noSupport="Sorry your OS is not supported by this setup script."

    if [ "${OS}" == "windowsnt" ]; then
        echo -n ${noSupport}
	elif [ "${OS}" == "darwin" ]; then
        which -s brew
        if [[ $? != 0 ]] ; then
            # Install Homebrew
            # https://github.com/mxcl/homebrew/wiki/installation
            echo "\n"
            echo "Installing Homebrew..."
            /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        else
            echo "\n"
            echo "Updating Homebrew..."
            brew update
        fi
        echo "\n"
        echo "Installing Docker..."
        brew cask install docker
        echo "\n"
        echo "Installing Java8..."
        brew tap caskroom/versions
        brew cask install java8
        echo "\n"
        echo "Installing Maven..."
        brew install maven
        echo "\n"
        echo "Installing Node..."
        brew install node
        echo "\n"
        echo "Installing Yarn..."
        brew install yarn
        echo "\n"
        echo "Opening Docker, complete the setup there."
        open -a Docker
        echo "\n"
        echo "Done!"
    else
        OS=`uname`
        if [ "${OS}" = "Linux" ] ; then
            if [ -f /etc/debian_version ] ; then
                sudo apt-get update
                curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
                curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
                echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
                sudo apt-get install -y build-essential maven mysql-server nodejs yarn

                sudo service mysql start
            else
                echo -n ${noSupport}
            fi
        else
            echo -n ${noSupport}
        fi
    fi
}

installPackages