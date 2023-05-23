import { useState } from 'react';
import Button from '../components/ui/Button';
import { MdClose } from 'react-icons/md';
import { Input } from './ui/Input';
import { Textarea } from './ui/textarea';
import Title from './ui/Title';


export default function Post() {
    const [state, setState] = useState(false);

    return (
        <>
            <Button onClick={()=>setState(true)} className="justify-self-center text-neutral-200 bg-purple-600 hover:bg-purple-700">
                <span className="mx-4">Add Event</span>
            </Button>
            <div
                className={`${state ? "opacity-100 block" : "opacity-0 hidden"
                    } fixed top-0 left-0 right-0 bottom-0 bg-neutral-800/80 z-[500] flex justify-center items-center max-sm:pt-16 px-6 sm:px-4 max-sm:pb-10 transition-all duration-300`}
            >
                <div className="container w-[500px] relative bg-slate-950 pt-16 pb-10 px-10 rounded-3xl">
                    <Button
                        variant={"ghost"}
                        onClick={() => setState(false)}
                        className="absolute top-4 right-4 text-xl"
                    >
                        <MdClose />
                    </Button>
                    <Title className="text-center mb-11 text-neutral-200">
                        Add Event
                    </Title>
                    <form action="" className='text-lg grid gap-8'>
                        <Input type='text' name='title' placeholder='Title' />
                        <Textarea type='text' name='description' placeholder='Description' className='' />
                        <Input type='text' name='date' placeholder='Date' />
                        <Button>Post</Button>
                    </form>
                </div>
            </div>
        </>
    )
}