const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type:DataTypes.STRING,
        defaultValue:'buyer',
        },
      confirmationCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'null'
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  const Products = sequelize.define('products', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    shop: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: "id",
      },
    },
  },
    {
      tableName: "products",
      timestamps: true,
    },
  );
  const ProductReview = sequelize.define(
    "productReview",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "product_reviews",
      timestamps: true,
      indexes: [
        // Add a unique constraint to the combination of userId and productId
        {
          unique: true,
          fields: ['userId', 'productId'],
        },
      ],
    }
  );
  const Cart = sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "carts",
      timestamps: true,
    }
  );
 const CartItem = sequelize.define(
    "cartItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      SKU: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "cart_items",
      timestamps: true,
    }
  );
  
  const Tag = sequelize.define('tags', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    
  },
  {
    tableName:"tags",
    timestamps: true,
  },
  );
  
  const ProductTag = sequelize.define('product_tags', {
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    tagId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'tags',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName:"product_tags",
    timestamps: true,
  },
  );
  ProductReview.belongsTo(Products,{foreignkey:"productId"});
  ProductReview.belongsTo(User,{foreignKey:"userId"});
  CartItem.belongsTo(Products, { foreignKey: "productId" });
  CartItem.belongsTo(Cart, { foreignKey: "cartId" });
  Cart.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(ProductReview,{foreignKey:"userId"});
  Products.belongsToMany(Tag, { through: ProductTag });
  Tag.belongsToMany(Products, { through: ProductTag });
  Products.belongsTo(User, { foreignKey: "userId" });
  // Hash password before saving to the database
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcryptjs.hash(user.password, 10);
    }
  });

  return {User,Products,ProductTag,Tag,Cart,CartItem,ProductReview };
};
