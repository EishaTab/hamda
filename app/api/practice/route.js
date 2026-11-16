// export async function GET () {
//     return Response.json([
//         {id: 1, name: "Ali", city: "Faisalabad"},
//         {id: 2, name: "Sara", city: "Lahore"},
//         {id: 3, name: "Ahmed", city: "Karachi"},
//         {id: 4, name: "Ayesha", city: "Islamabad"},
//         {id: 5, name: "Hassan", city: "Multan"},
//         {id: 6, name: "Fatima", city: "Hyderabad"},
//         {id: 7, name: "Usman", city: "Rawalpindi"},
//         {id: 8, name: "Maryam", city: "Peshawar"},
//         {id: 9, name: "Bilal", city: "Quetta"},
//         {id: 10, name: "Zainab", city: "Sialkot"},
//     ]);
// }
let allStudents = [
    { id: 1, name: "Ali", city: "Faisalabad" },
    { id: 2, name: "Sara", city: "Lahore" },
    { id: 3, name: "Ahmed", city: "Karachi" },
    { id: 4, name: "Ayesha", city: "Islamabad" },
    { id: 5, name: "Hassan", city: "Multan" },
    { id: 6, name: "Fatima", city: "Hyderabad" },
    { id: 7, name: "Usman", city: "Rawalpindi" },
    { id: 8, name: "Maryam", city: "Peshawar" },
    { id: 9, name: "Bilal", city: "Quetta" },
    { id: 10, name: "Zainab", city: "Sialkot" },
]
export async function GET() {
    return Response.json({
        success: true,
        student: { name: "ali", age: 40 },
        allStudents: allStudents
    });
}
export async function POST(request) {
    const newStudent = await request.json()

    if (newStudent.name && newStudent.city) {
        allStudents.push({ id: allStudents.length + 1, ...newStudent })
    }
    return Response.json({
        success: true,
        allStudents: allStudents
    });
}
export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    console.log("searchParamas", searchParams, new URL(req.url), req)
    const id = Number(searchParams.get("id"));
    allStudents = allStudents.filter((s) => s.id !== id);
    return Response.json({
        success: true,
        message: "Sara deleted successfully",
        allStudents: allStudents
    });
}
export async function PUT(request) {
    const newStudent = await request.json()
    console.log(newStudent, "newStudent")

    if (newStudent.name && newStudent.city && newStudent.id) {
       const newArray=  allStudents.map(s => {
            if (s.id === newStudent.id) {
                console.log("Match found", s)
                return newStudent
            }
            else return s
        })
        allStudents=newArray
    }
    return Response.json({
        success: true,
        allStudents: allStudents
    });
}