import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getData() {
  const response = await prisma.school.findMany();
  return response;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">School List</h1>
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {item.Address}
              </p>
              <p className="text-sm text-gray-600">
                <strong>City:</strong> {item.City}
              </p>
              <p className="text-sm text-gray-600">
                <strong>State:</strong> {item.State}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact:</strong> {item.Contact}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {item.Email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
