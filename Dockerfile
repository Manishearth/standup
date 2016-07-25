FROM debian:jessie

# Set Python-related environment variables to reduce annoying-ness
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

EXPOSE 8000

RUN adduser --uid 1000 --disabled-password --gecos '' --no-create-home webdev

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential python3 python3-dev python3-pip \
                                               libpq-dev postgresql-client gettext && \
    rm -rf /var/lib/apt/lists/*

RUN update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 10
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 10

WORKDIR /app

CMD ["./bin/run-prod.sh"]

# Get pip8
COPY bin/pipstrap.py bin/pipstrap.py
RUN ./bin/pipstrap.py

# First copy requirements.txt and peep so we can take advantage of
# docker caching.
COPY requirements.txt /app/requirements.txt
COPY requirements-dev.txt /app/requirements-dev.txt
RUN pip install --require-hashes --no-cache-dir -r requirements-dev.txt

COPY . /app
# RUN DEBUG=False SECRET_KEY=foo ALLOWED_HOSTS=localhost, DATABASE_URL=postgres://foo ./manage.py collectstatic --noinput -c
RUN chown webdev.webdev -R .
USER webdev
