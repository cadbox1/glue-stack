
databaseName=Glue


lowercase(){
	echo "$1" | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/"
}

# Adapted from https://github.com/coto/server-easy-install/blob/master/lib/core.sh
installPackages(){
    OS=`lowercase \`uname\``
	KERNEL=`uname -r`
	MACH=`uname -m`
    noSupport="Sorry your OS is not supported in this setup script, please follow the setup instructions in the README"

    if [ "${OS}" == "windowsnt" ]; then
        echo -n ${noSupport}
	elif [ "${OS}" == "darwin" ]; then
        which -s brew
        if [[ $? != 0 ]] ; then
            # Install Homebrew
            # https://github.com/mxcl/homebrew/wiki/installation
            /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        else
            brew update
        fi

        brew install mysql
        mysql.server restart
	echo -e "\nJust hit enter for no password (recommended)\n"
        mysql -uroot -p -e "CREATE DATABASE ${databaseName} /*\!40100 DEFAULT CHARACTER SET utf8 */;"

        brew install maven

        brew install node

        brew install yarn
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

setupProperties() {
    echo -e "\n>>> Starting API server setup <<<\n"
    echo -e "\n>>> Press enter to use default values (shown in square brackets) <<<\n"

    read -p "mysql url [mysql://localhost]: " databaseUrl
    read -p "mysql username [root]: " databaseUsername
    echo -n "mysql password []: "
    read -s databasePassword
    echo -e $"\n"

    if [ -z "$databaseUrl" ]; then
        databaseUrl=mysql://localhost
    fi
    if [ -z "$databaseUsername" ]; then
        databaseUsername=root
    fi

    databaseUrl=$(sed 's/[&/\]/\\&/g' <<< "$databaseUrl")
    databaseUsername=$(sed 's/[&/\]/\\&/g' <<< "$databaseUsername")
    databasePassword=$(sed 's/[&/\]/\\&/g' <<< "$databasePassword")

    # Insert database variables into application properties
    sed -i '' -e "s/\(spring\.datasource\.url=\).*\$/\1jdbc:${databaseUrl}\/${databaseName}/" -e "s/\(spring\.datasource\.username=\).*\$/\1${databaseUsername}/" -e "s/\(spring\.datasource\.password=\).*\$/\1${databasePassword}/" api/src/main/resources/application.properties
}

main() {
    installPackages
    setupProperties
}

main
