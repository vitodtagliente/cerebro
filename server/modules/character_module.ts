import { Character } from "libgame";
import { Table } from "../database";
import ModelQuery from "../models/model_query";

export default class CharacterModule
{
    public async findByUser(id: string): Promise<Array<Character>>
    {
        // return ModelQuery.find(Character, Table.Characters, {});
        return [];
    }
}