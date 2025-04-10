"use client"

import {BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2, Undo2Icon} from "lucide-react";

import {cn} from "@/lib/utils"

import {useEditor, EditorContent} from '@tiptap/react'

import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEditorStore } from '@/store/use-editor-store'
import { Separator } from "@/components/ui/separator";

const FontFamilyButtom = () => {
    const { editor } = useEditorStore();

    const fonts = [
        {label: "Arial", value: "Arial"},
        {label: "Times New Roman", value: "Times New Roman"},
        {label: "Courier New", value: "Courier New"},
        {label: "Georgia", value: "Georgia"},
        {label: "Verdana", value: "Verdana"},

    ];

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-500 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({label, value}) =>(
                    <button
                     onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                     key={value}
                     className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-500",
                        editor?.getAttributes("textStyle").FontFamily === value && "bg-neutral-500"
                     )}
                     style={{fontFamily:value}}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps{
    onClick?: ()=> void;
    isActive?: boolean;
    icon: LucideIcon
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon:Icon
}:ToolbarButtonProps) =>{
    return(
        <button
            onClick={onClick}
            className={cn(
                "text-sm h=7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-400",
                isActive && "bg-neutral-400"
            )}
        >
            <Icon className="size-4"/>
        </button>
    )
}

export const Toolbar = ()=>{
    const { editor } = useEditorStore()

    const sections: { 
        label:string; 
        icon:LucideIcon; 
        onClick: () => void ;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                },
            }
        ],
        [
            {
                label: "Bold",
                icon : BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => console.log("Todo: comet"),
                isActive: false,
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Romove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
            
        ]
    ];

    return(
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            <Separator orientation="vertical" className="h-6 bg-[#133770]"/>
            <FontFamilyButtom/>
            <Separator orientation="vertical" className="h-6 bg-neutral-500"/>

            <Separator orientation="vertical" className="h-6 bg-neutral-500"/>
                
            <Separator orientation="vertical" className="h-6 bg-neutral-500"/>
            {sections[1].map((item) =>(
                <ToolbarButton key={item.label} {...item}/>
            ))}


            <Separator orientation="vertical" className="h-6 bg-neutral-500"/>

            {sections[2].map((item) =>(
                <ToolbarButton key={item.label} {...item}/>
            ))}
        </div>
    )
}