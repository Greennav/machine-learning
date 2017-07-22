#!/usr/bin/env bash

RESET=`tput sgr0`
BOLD="`tput bold`"
RED="$RESET`tput setaf 1`$BOLD"
GREEN="$RESET`tput setaf 2`"
YELLOW="$RESET`tput setaf 3`"
BLUE="$RESET`tput setaf 4`$BOLD"

export PYTHONPATH="$PWD:$PYTHONPATH"

echo "${YELLOW}This script will prepare the data."

if [ ! -e train.py ]; then
    echo "${RED}train.py not found."
    exit 1
fi

echo -e "\n$BLUE# Checking for the dependencies"

python_import(){
    echo -n "${YELLOW}$1... $RESET"
    if ! python2 -c "import $1; print '${GREEN}version', $1.__version__, '${YELLOW}(we used version $2)'"; then
        echo "${RED}failed, $1 is not installed"
        exit 1
    fi
}

python_import h5py 2.7.0
python_import theano 0.9.0
python_import fuel 0.2.0
python_import blocks 0.2.0
python_import sklearn 0.18.1


echo -e "\n$BLUE# Checking data"
TAXI_PATH='/home/saumya/Downloads/gsoc/route_prediction/data'
echo "${YELLOW}TAXI_PATH is set to $TAXI_PATH"

md5_check(){
    echo -n "${YELLOW}md5sum $1... $RESET"
    if [ ! -e "$TAXI_PATH/$1" ]; then
        echo "${RED}file not found."
        exit 1
    fi
	if command -v md5 >/dev/null 2>&1; then
		md5=`md5 "$TAXI_PATH/$1" | sed -e 's/^.* //'`
	elif command -v md5sum >/dev/null 2>&1; then
		md5=`md5sum "$TAXI_PATH/$1" | sed -e 's/ .*//'`
	else
        echo "${RED} no md5 utility"
		return
	fi
    if [ $md5 = $2 ]; then
        echo "$GREEN$md5 ok"
    else
        echo "$RED$md5 failed"
        exit 1
    fi
}

md5_check train.csv.zip 87a1b75adfde321dc163160b495964e8
md5_check test.csv.zip 47133bf7349cb80cc668fa56af8ce743
md5_check metaData_taxistandsID_name_GPSlocation.csv.zip fecec7286191af868ce8fb208f5c7643


echo -e "\n$BLUE# Extracting data"

zipextract(){
	echo -n "${YELLOW}unziping $1... $RESET"
	unzip -o "$TAXI_PATH/$1" -d "$TAXI_PATH"
	echo "${GREEN}ok"
}

zipextract train.csv.zip
md5_check train.csv 68cc499ac4937a3079ebf69e69e73971

zipextract test.csv.zip
md5_check test.csv f2ceffde9d98e3c49046c7d998308e71

zipextract metaData_taxistandsID_name_GPSlocation.csv.zip

echo -n "${YELLOW}patching error in metadata csv... $RESET"
cat "$TAXI_PATH/metaData_taxistandsID_name_GPSlocation.csv" | sed -e 's/41,Nevogilde,41.163066654-8.67598304213/41,Nevogilde,41.163066654,-8.67598304213/' > "$TAXI_PATH/metaData_taxistandsID_name_GPSlocation.csv.tmp"
mv "$TAXI_PATH/metaData_taxistandsID_name_GPSlocation.csv.tmp" "$TAXI_PATH/metaData_taxistandsID_name_GPSlocation.csv"
echo "${GREEN}ok"

md5_check metaData_taxistandsID_name_GPSlocation.csv 724805b0b1385eb3efc02e8bdfe9c1df

echo -e "\n$BLUE# Conversion of training set to HDF5"
echo "${YELLOW}This might take some time$RESET"
python2 data/data_to_hdf5.py "$TAXI_PATH" "$TAXI_PATH/data.hdf5"


echo -e "\n$BLUE# Generation of validation set"
echo "${YELLOW}This might take some time$RESET"

echo -n "${YELLOW}initialization... $RESET"
python2 data/valid_initialisation.py
echo "${GREEN}ok"

echo -n "${YELLOW}cutting... $RESET"
python2 data/valid_cut.py test0
echo "${GREEN}ok"


echo -e "\n$BLUE# Generation of cluster"
echo "${YELLOW}This might take some time$RESET"
echo -n "${YELLOW}generating... $RESET"
python2 data_analysis/cluster.py
echo "${GREEN}ok"


echo -e "\n$BLUE# Creating output folders"
echo -n "${YELLOW}mkdir model_data... $RESET"; mkdir model_data; echo "${GREEN}ok"
echo -n "${YELLOW}mkdir output... $RESET"; mkdir output; echo "${GREEN}ok"

echo -e "\n$GREEN${BOLD}The data was successfully prepared"
echo "${YELLOW}Train the model using the following command:"
echo "${YELLOW}python2 train.py final_model"
