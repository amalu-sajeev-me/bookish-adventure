import express, {json, urlencoded} from 'express';

type IBodyParserJSONOptions = Parameters<typeof json>[0];
type IBodyParserUrlOptions = Parameters<typeof urlencoded>[0];

const jsonOptions: IBodyParserJSONOptions = {};
const urlencodedOptions: IBodyParserUrlOptions = {
    extended: true
};

export const bodyParser = [
    express.json(jsonOptions),
    express.urlencoded(urlencodedOptions)
] as const;
