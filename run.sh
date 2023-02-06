#!/bin/bash

python principal.py &
python minutos.py &
python diario.py &

wait
