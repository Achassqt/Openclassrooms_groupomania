exports.signupErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.errors.pseudo) errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.errors.email) errors.email = "Email incorrect ou déjà enregistré";

  if (err.errors.password)
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  return errors;
};

exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Mot de passe inconnu";

  return errors;
};
