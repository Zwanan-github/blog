"use server"

import { whiteList } from "@/app/white-list";
import fs from "fs/promises";
import path from "path";

export interface Blog {
    name: string;
    date: string;
    content: string;
}


export async function getBlogList(): Promise<Blog[]> {
    try {
        // 获取mds文件夹下的所有文件
        const mds = await fs.readdir(path.join(process.cwd(), "/content/mds"));
        // 读取每个md文件的内容 
        const blogList = await Promise.all(mds.map(async (md) => {
            // 文件名以 [name]-[yyyy-mm-dd].md 命名， 解析出name和date
            // 解析两个[]的内容
            const matches = md.match(/\[(.*?)\]-\[(.*?)\]/)!;
            const name = matches[1]!;
            const date = matches[2]!;
            // 把date转换为yyyy-mm-dd
            const dateTime = new Date(date).toISOString().split("T")[0];
            return {
                name,
                date: dateTime,
                content: ""
            }
        }));
        // 按日期降序排序，去除whiteList中为前缀的内容
        blogList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return blogList.filter((blog) => !whiteList.some((white) => white.name != '' && blog.name.startsWith(white.name)));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBlog(name: string): Promise<Blog | null> {
    try {
        const mds = await fs.readdir(path.join(process.cwd(), "/content/mds"));
        const blog = mds.find((md) => md.startsWith(`[${name}]`));
        if (!blog) {
            return null;
        }
        const content = await fs.readFile(path.join(process.cwd(), "/content/mds", blog!), "utf-8");
        // 文件名以 [name]-[yyyy-mm-dd].md 命名， 解析出name和date
        // 解析两个[]的内容
        const matches = blog!.match(/\[(.*?)\]-\[(.*?)\]/)!;
        const title = matches[1]!;
        const date = matches[2]!;
        // 把date转换为yyyy-mm-dd
        const dateTime = new Date(date).toISOString().split("T")[0];
        return {
            name: title,
            date: dateTime,
            content
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
