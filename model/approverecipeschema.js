const mong=require('mongoose')

const approverecipeschema=new mong.Schema({
    recipeimg: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      serve: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      ingredients: [
        {
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          unit: {
            type: String,
            required: true,
          },
        },
      ],
      steps: [
        {
          number: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
      userid: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending',
      },
})

const approvedRecipes=mong.model("approvedRecipes",approverecipeschema)

module.exports=approvedRecipes