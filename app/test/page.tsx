import { createConnection } from '@/lib/db';

export default async function DataTestPage() {
  let users = [];
  let error = null;

  try {
    const db = await createConnection();
    
    // SQL QUERY: Fetch the first 5 users
    const [rows]: any = await db.execute('SELECT userID, fName, lName, email, userRole FROM User LIMIT 5');
    users = rows;
    
    await db.end();

  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Data Fetching Test</h1>

      {error ? (
        <div className="bg-rose-900/50 border border-rose-500 text-rose-200 p-4 rounded-xl">
          <h3 className="font-bold">Error Fetching Data</h3>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-400">
            Found <strong>{users.length}</strong> users in your database:
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: any) => (
              <div 
                key={user.userID} 
                className="p-4 rounded-xl border border-slate-700 bg-slate-900/50 shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-white">
                    {user.fName} {user.lName}
                  </h2>
                  <span className="text-xs uppercase tracking-wider bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-slate-700">
                    {user.userRole}
                  </span>
                </div>
                <p className="text-sm text-slate-400 break-all">{user.email}</p>
                <p className="text-xs text-slate-600 mt-2">User ID: {user.userID}</p>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="p-6 border border-yellow-600 bg-yellow-900/20 rounded-xl text-yellow-200">
              <strong>Table is empty!</strong> 
              <br />
              The connection works, but the 'User' table has no rows. 
              Did you run the <code>seeds.sql</code> script in Workbench?
            </div>
          )}
        </div>
      )}
    </div>
  );
}