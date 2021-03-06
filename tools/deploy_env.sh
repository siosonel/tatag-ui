#!/bin/bash

##############################################################
# Intended to be called as global vars within the shell context of
# tools/deploy.sh
# 
# Author: Edgar Sioson
# Date: 2015-03-16
#############################################################

APP="ui"
if [[ "$USER" == "" ]]; then USER="root"; fi


case $AUDIENCE in
		public)		
				# build_delete="php/config-internal.php php/config-experts.php php/mortFileSha1.php README.txt"
		
        # for integration testing of new features, debugged code				
				if [[ "$ENV" == "stage" ]]; then
					SERVER=tatag.cc
					REMOTE_DIR=/var/www/stage/$APP
					URL="http://stage.tatag.cc/$APP/"
					xhome="~/builds/"
				
				elif [[ "$ENV" == "live" ]]; then
					SERVER=tatag.cc
					REMOTE_DIR=/var/www/html/$APP
					URL="http://tatag.cc/$APP/"
					xhome="~/builds/"
					
				fi
				;;
				
esac
