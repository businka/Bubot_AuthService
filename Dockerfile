FROM python:3.10-alpine
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools


WORKDIR /usr/src

# Copy the source code
COPY . .

RUN ls
RUN ls /usr/src/tests


RUN python -m pip install -e ".[testing]" --root-user-action=ignore
# RUN pip install requirements.txt


# ⑥ Volume when container is used as volume container
VOLUME /usr/src