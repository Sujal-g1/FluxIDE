

export const buildTree=( files )=>{

    let map={}
    let tree=[]

    files.forEach((file) => {
        map[file._id.toString()] = {
            ...file.toObject(),
            children:[]
        }
    });

     files.forEach((file)=>{
        const id = file._id.toString()

        if (file.parentId) {
            const parentId = file.parentId.toString();
            const parent = map[parentId];

        if (parent) {
        parent.children.push(map[id]);
      } else {
        tree.push(map[id]);
      }
        } else {
        // Root folder: parentId is null
        tree.push(map[id]);
      }
     })

     return tree
}