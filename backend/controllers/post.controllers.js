/* Import des modules necessaires */
const db = require("../db.config");
const Post = db.post;
const Comment = db.comment;
const fs = require("fs");

/* Controleur récupération des posts */
exports.getAllPosts = (req, res, next) => {
  Post.findAll({ include: Comment })
    .then((posts) => res.json({ data: posts }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

/* Controleur récupération post */
exports.getOnePost = async (req, res, next) => {
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Récupération du post
    let post = await Post.findOne({
      where: { id: postId },
      include: Comment,
    });

    // Test si résultat
    if (post === null) {
      return res.status(404).json({ message: "This post does not exist !" });
    }

    // Renvoi du Post trouvé
    return res.json({ data: post });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur création post */
exports.createPost = async (req, res, next) => {
  const { user_id, title, content, imageUrl } = req.body;
  // const postObject = JSON.parse(req.body.post);
  // const post = new Post({
  //   ...postObject,
  //   imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //     req.file.filename
  //   }`,});
  // Validation des données reçues
  if (!user_id || !title || !content || !imageUrl) {
    return res.status(400).json({ message: "Missing Data" });
  }
  try {
    // Création du post
    let post = await Post.create(req.body); // Editer a l'implementation des images (let newPost / Post.create(post))
    return res.json({ message: "Post Created", data: post });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur modification post */
exports.updatePost = async (req, res, next) => {
  // Editer a l'implementation des images
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    // Recherche du post et vérification
    let post = await Post.findOne({ where: { id: postId }, raw: true });
    if (req.tokenId !== post.user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Vérifier si le post existe
    if (post === null) {
      return res.status(404).json({ message: "This post does not exist !" });
    }

    // Mise à jour du post
    await Post.update(req.body, { where: { id: postId } });
    return res.json({ message: "Post Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur suppression post */
exports.deletePost = (req, res, next) => {
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  Post.findOne({ where: { id: postId }, raw: true }).then((post) => {
    if (req.tokenId === post.user_id || req.role === 1) {
      // Suppression du post
      Post.destroy({ where: { id: postId }, force: true })
        .then(() => res.status(204).json({}))
        .catch((err) =>
          res.status(500).json({ message: "Database Error", error: err })
        );
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};

/* Controleur suppression soft post */
exports.trashPost = (req, res, next) => {
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Suppression du post
  Post.destroy({ where: { id: postId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

/* Controleur récuperation soft post */
exports.untrashPost = (req, res, next) => {
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Restauration du post
  Post.restore({ where: { id: postId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

/* Controleur création commentaire */
exports.createComment = async (req, res, next) => {
  const { user_id, username, content, PostId } = req.body;

  if (!user_id || !username || !content || !PostId) {
    return res.status(400).json({ message: "Missing Data" });
  }
  try {
    // Création du commentaire
    let comment = await Comment.create(req.body);
    return res.json({ message: "Comment Created", data: comment });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur modification commentaire */
exports.updateComment = async (req, res, next) => {
  // Editer a l'implementation des images
  let commentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!commentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    // Recherche du commentaire et vérification
    let comment = await Comment.findOne({
      where: { id: commentId },
      raw: true,
    });
    if (req.tokenId !== comment.user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Vérifier si le commentaire existe
    if (comment === null) {
      return res.status(404).json({ message: "This comment does not exist !" });
    }

    // Mise à jour du commentaire
    await Comment.update(req.body, { where: { id: commentId } });
    return res.json({ message: "Comment Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur suppression commentaire */
exports.deleteComment = (req, res, next) => {
  let commentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!commentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  Comment.findOne({ where: { id: commentId }, raw: true }).then((comment) => {
    if (req.tokenId === comment.user_id || req.role === 1) {
      // Suppression du comment
      Comment.destroy({ where: { id: commentId }, force: true })
        .then(() => res.status(204).json({}))
        .catch((err) =>
          res.status(500).json({ message: "Database Error", error: err })
        );
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};

/* Controleur suppression soft commentaire */
exports.trashComment = (req, res, next) => {
  let commentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!commentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Suppression du commentaire
  Comment.destroy({ where: { id: commentId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

/* Controleur récuperation soft commentaire */
exports.untrashComment = (req, res) => {
  let commentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!commentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Restauration du commentaire
  Comment.restore({ where: { id: commentId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
