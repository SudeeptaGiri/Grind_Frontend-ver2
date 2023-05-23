import Button from "../components/ui/Button";
import { Link } from 'react-router-dom';

export default function Select() {
    return (
        <main className="min-h-screen text-neutral-400 bg-slate-950">
            <div className="flex flex-col h-screen justify-center items-center">
                <img src='/logo.png' width={250} height={100} alt="" className="mb-4" />
                <div className="grid gap-6 text-center border p-8 rounded-3xl">
                    <table className="font-medium text-lg">
                        <tr>
                            <td className="py-4 px-6">Select Sport:</td>
                            <td className="py-4 px-6">
                                <select id="sport" className="w-44 h-10 bg-transparent border rounded-md p-1">
                                    <option value="cricket">Cricket</option>
                                    <option disabled value="tennis" className="opacity-25">Tennis (soon)</option>
                                    <option disabled value="opel" className="opacity-25">Chess (soon)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6">Select Category:</td>
                            <td className="py-4 px-6">
                                <select id="category" className="w-44 h-10 bg-transparent border rounded-md p-1">
                                    <option value="cricket">Forward Defence</option>
                                    <option disabled value="tennis" className="opacity-25">Straight Drive (soon)</option>
                                    <option disabled value="opel" className="opacity-25">Backfoot Drive (soon)</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <Link to="/start" className="w-fit md:px-4 justify-self-end"><Button>Next</Button></Link>
                </div>
            </div>
        </main>
    )
}