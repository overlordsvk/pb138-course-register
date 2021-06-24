function hasuraClaimsRule(user, context, callback) {
    const namespace = "https://hasura.io/jwt/claims";
    context.accessToken[namespace] = {
        "X-Hasura-Default-Role": "student",
        "X-Hasura-Allowed-Roles": ["student"],
        "X-Hasura-User-Id": user.user_id
    };
    callback(null, user, context);
}