FROM wechaty/wechaty

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /bot

# npm config set registry https://registry.npm.taobao.org --global
# npm config set disturl https://npm.taobao.org/dist --global

COPY package.json .
RUN npm install cnpm -g -registry=https://registry.npm.taobao.org
RUN jq 'del(.dependencies.wechaty)' package.json | sponge package.json \
    && cnpm install \
    && sudo rm -fr /tmp/* ~/.npm \
RUN npm run puppet-install
COPY . .

CMD [ "npm", "run", "start-v2" ]