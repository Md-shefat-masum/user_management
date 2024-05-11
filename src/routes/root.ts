'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import check_auth_and_redirect from '../modules/auth_management/authetication/services/check_auth_and_redirect';
import minified_view from '../helpers/minified_view';
// const fs = require('node:fs');
module.exports = async function (fastify: FastifyInstance) {
    fastify
        .get(
            '/',
            { preHandler: check_auth_and_redirect },
            async (req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('index.ejs', { text: 'Hello EJS!' });
            },
        )
        .get('/login', async (req: FastifyRequest, reply: FastifyReply) => {
            let html = await minified_view(fastify, 'login.ejs');
            return reply.type('text/html').send(html);
        })
        .get('/about', async function (request, reply) {
            return (reply as any).cookie('baz', 'baz').view('about.ejs', {
                data: 'about page',
            });
        })
        .post('/c', async function (req: FastifyRequest) {
            const { body, validationResult } = require('express-validator');
            console.log('request', req.body);
            return { a: 'sdf' };
        });
};
