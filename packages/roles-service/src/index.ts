import express from 'express';
import {middleware} from 'express-openapi-validator';
import { components, paths } from './__generated__/openapi-schema';
import bodyParser from 'body-parser';

type Role = components['schemas']['Role'];
let roles: Role[] = [];

const app = express();

app.use(bodyParser.json());

app.use(
  middleware({
    apiSpec: './openapi.json',
    validateRequests: {
      allowUnknownQueryParameters: false
    },
    validateResponses: {
      removeAdditional: "failing"
    },
  }),
);

type GetRolesQuery = paths['/roles']['get']['parameters']['query'];
type GetRoles200JsonResponse = paths['/roles']['get']['responses']['200']['application/json'];
app.get('/roles', (req, res) => {
  const query: GetRolesQuery = req.query as any;
  const jsonResponse: GetRoles200JsonResponse = roles.slice(query.current_page * query.page_size, query.page_size);
  return res.json(jsonResponse);
});

type PostRolesRequestBody = paths['/roles']['post']['requestBody']['application/json'];
type PostRoles200JsonResponse = paths['/roles']['post']['responses']['200']['application/json'];
app.post('/roles', (req, res) => {
  const body: PostRolesRequestBody = req.body;
  const role: Role = {
    id: roles.length.toString(),
    name: body.name,
    email_prefix: body.email_prefix,
  };
  roles.push(role)

  const jsonResponse:PostRoles200JsonResponse = role;
  return res.json(jsonResponse);
})

type GetRoleParams = paths['/roles/{roleId}']['get']['parameters']['path'];
type GetRole200JsonResponse = paths['/roles/{roleId}']['get']['responses']['200']['application/json'];
app.get('/roles/:roleId', (req, res) => {
  const params: GetRoleParams = req.params as any;
  const role = roles.find(role => role.id === params.roleId);
  if (!role) {
    return res.status(404).send();
  }

  const jsonResponse: GetRole200JsonResponse = role;
  return res.send(jsonResponse);
});

type PatchRoleParams = paths['/roles/{roleId}']['patch']['parameters']['path'];
type PatchRoleBody = paths['/roles/{roleId}']['patch']['requestBody']['application/json'];
type PatchRole200JsonResponse = paths['/roles/{roleId}']['patch']['responses']['200']['application/json'];
app.patch('/roles/:roleId', (req, res) => {
  const params: PatchRoleParams = req.params as any;
  const body: PatchRoleBody = req.body;
  const role = roles.find(role => role.id === params.roleId);
  if (!role) {
    return res.status(404).send();
  }

  if (body.email_prefix) {
    role.email_prefix = body.email_prefix;
  }

  if (body.name) {
    role.name = body.name;
  }

  roles = roles.map(r => r.id === role.id ? role : r);

  const jsonResponse: PatchRole200JsonResponse = role;
  return res.send(jsonResponse);
});

type DeleteRoleParams = paths['/roles/{roleId}']['delete']['parameters']['path'];
app.delete('/roles/:roleId', (req, res) => {
  const params: DeleteRoleParams = req.params as any;
  
  roles = roles.filter(role => role.id !== params.roleId);

  return res.status(204).send();
});

// TODO why are there errors here?
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(3000, () => console.log("Roles service running"));
