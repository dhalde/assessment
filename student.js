const fs = require('fs');
const path = require('path');
var dir = 'dbjson.json';

// const p = path.join('data', "detail.json");
// console.log(p);


let students = [];

// const getInfo = (data) => {
//     fs.readFile("./detail.json", 'utf8', (err, fileContent) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             data(JSON.parse(fileContent));

//         }
//     })
// }

const writeFunction = (data) => {

    fs.writeFile('detail.json', data, 'utf8', err => {
        if (err) {
            console.log(`Error writing file: ${err}`)
        } else {
            console.log(`File is written successfully!`)
        }
    })
}

const readFunction = async () => {
    await fs.readFile('./detail.json', 'utf8', async (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {

            const databases = JSON.parse(data);
            console.log(databases);
            return databases;

        }
    })
}

class Student {
    id = 0;

    init(filePath) {
        if (!fs.existsSync(filePath)) {
            fs.writeFile("detail.json", "", err => {
                if (err) {
                    console.log(`Error writing file: ${err}`)
                } else {
                    this.filelocation = "detail.json"
                    console.log(`File is created successfully!`)
                }
            })
        } else {
            this.filelocation = filePath;
            console.log('file is existed');
        }

    }

    create(studentDetail) {
        this.id++;

        studentDetail['id'] = this.id;

        students.push(studentDetail);
        const data = JSON.stringify(students);
        // console.log(data);

        writeFunction(data);

    }

    update(studentObj) {
        let data = readFunction();
        console.log(data);
        data = data.filter(d => d.id != studentObj.id)
        data.push(studentObj);
        console.log(data);
        students = data;
        // console.log(student);
        data = JSON.stringify(data);

        writeFunction(data);


    }

    async read() {
        // readFunction().then(data => {
        //     console.log(data);
        // }).catch(err => {
        //     console.log(err);
        // });
        const data = await readFunction();
        console.log(data);


    }




    delete(id) {
        let data = readFunction();
        data = data.filter(d => d.id != id)

        students = data;
        console.log(students);
        data = JSON.stringify(data);

        writeFunction(data);



    }

};

module.exports = Student;

