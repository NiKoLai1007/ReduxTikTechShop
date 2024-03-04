const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: { 
        type: String,
    }
})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});
// categorySchema.method('toJSON', function(){
//     const { __v, ...object } = this.toObject();
//     const { _id:id, ...result } = object;
//     return { ...result, id };
// });

exports.Category = mongoose.model('Category', categorySchema);
// {
//     "name": "Electronics",
//     "icon": "category.jpg",
//     "color": "white"
// }