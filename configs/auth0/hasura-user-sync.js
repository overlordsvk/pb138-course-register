function userSyncRule(user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;
  const email = user.email;
  const picture = user.picture;

  const mutation = `mutation AddUserAuth($userId: String!, $nickname: String, $email: String, $picture: String) {
    insert_users(objects: [{
        auth0_id: $userId,
        name: $nickname,
				email: $email,
				picture: $picture
      }],
      on_conflict: {
        constraint: users_pkey,
        update_columns: [last_seen, name]
      }) {
        affected_rows    
        returning {
              role
				}
      }
    }`;

  request.post(
    {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": configuration.ACCESS_KEY,
      },
      url: "https://suited-pup-54.hasura.app/v1/graphql",
      body: JSON.stringify({
        query: mutation,
        variables: {
          userId,
          nickname,
          email,
          picture,
        },
      }),
    },
    function (error, response, body) {
      console.log(body);
      const res = JSON.parse(body);
      console.log("Role from DB");
      console.log(res.data.insert_users.returning[0].role);
      const namespace = "https://hasura.io/jwt/claims";
      context.accessToken[namespace] = {
        "X-Hasura-Default-Role": res.data.insert_users.returning[0].role,
        "X-Hasura-Allowed-Roles": [res.data.insert_users.returning[0].role],
        "X-Hasura-User-Id": user.user_id,
      };

      callback(error, user, context);
    }
  );
}
