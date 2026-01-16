/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { getLanguageService, TextDocument } from '../jsonLanguageService';
import * as Parser from '../parser/jsonParser';

suite('JSON Schema 2019-09 Core Features', () => {

const ls = getLanguageService({});

function toDocument(text: string, uri = 'foo://bar/file.json'): { textDoc: TextDocument, jsonDoc: Parser.JSONDocument } {
const textDoc = TextDocument.create(uri, 'json', 0, text);
const jsonDoc = Parser.parse(textDoc);
return { textDoc, jsonDoc };
}

test('$defs keyword replaces definitions', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'object',
$defs: {
positiveInteger: {
type: 'integer',
minimum: 1
}
},
properties: {
count: { $ref: '#/$defs/positiveInteger' }
}
};

const { textDoc, jsonDoc } = toDocument('{"count": 5}');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Valid document should have no errors');

const { textDoc: invalidDoc, jsonDoc: invalidJsonDoc } = toDocument('{"count": -1}');
const invalidErrors = await ls.doValidation(invalidDoc, invalidJsonDoc, {}, schema);
assert.strictEqual(invalidErrors.length, 1, 'Invalid document should have error');
});

test('dependentRequired keyword', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'object',
dependentRequired: {
lastName: ['firstName']
}
};

const { textDoc, jsonDoc } = toDocument('{"firstName": "John", "lastName": "Doe"}');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Document with both properties should be valid');

const { textDoc: missingDoc, jsonDoc: missingJsonDoc } = toDocument('{"lastName": "Doe"}');
const missingErrors = await ls.doValidation(missingDoc, missingJsonDoc, {}, schema);
assert.strictEqual(missingErrors.length, 1, 'Document missing required dependent property should have error');
});

test('dependentSchemas keyword', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'object',
dependentSchemas: {
creditCard: {
required: ['billingAddress']
}
}
};

const { textDoc, jsonDoc } = toDocument('{"creditCard": "1234", "billingAddress": "123 Main St"}');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Document with dependent schema satisfied should be valid');

const { textDoc: invalidDoc, jsonDoc: invalidJsonDoc } = toDocument('{"creditCard": "1234"}');
const invalidErrors = await ls.doValidation(invalidDoc, invalidJsonDoc, {}, schema);
assert.strictEqual(invalidErrors.length, 1, 'Document without required dependent field should have error');
});

test('minContains and maxContains keywords', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'array',
contains: { type: 'string' },
minContains: 2,
maxContains: 4
};

const { textDoc, jsonDoc } = toDocument('["a", "b", "c"]');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Array with 3 matching items should be valid');

const { textDoc: tooFewDoc, jsonDoc: tooFewJsonDoc } = toDocument('["a"]');
const tooFewErrors = await ls.doValidation(tooFewDoc, tooFewJsonDoc, {}, schema);
assert.strictEqual(tooFewErrors.length, 1, 'Array with only 1 matching item should have error');

const { textDoc: tooManyDoc, jsonDoc: tooManyJsonDoc } = toDocument('["a", "b", "c", "d", "e"]');
const tooManyErrors = await ls.doValidation(tooManyDoc, tooManyJsonDoc, {}, schema);
assert.strictEqual(tooManyErrors.length, 1, 'Array with 5 matching items should have error');
});

test('unevaluatedProperties keyword', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'object',
properties: {
name: { type: 'string' }
},
unevaluatedProperties: false
};

const { textDoc, jsonDoc } = toDocument('{"name": "John"}');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Object with only defined properties should be valid');

const { textDoc: extraDoc, jsonDoc: extraJsonDoc } = toDocument('{"name": "John", "extra": "value"}');
const extraErrors = await ls.doValidation(extraDoc, extraJsonDoc, {}, schema);
assert.strictEqual(extraErrors.length, 1, 'Object with unevaluated property should have error');
});

test('unevaluatedItems keyword', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'array',
items: [
{ type: 'string' },
{ type: 'number' }
],
unevaluatedItems: false
};

const { textDoc, jsonDoc } = toDocument('["hello", 42]');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 0, 'Array with only defined items should be valid');

const { textDoc: extraDoc, jsonDoc: extraJsonDoc } = toDocument('["hello", 42, true]');
const extraErrors = await ls.doValidation(extraDoc, extraJsonDoc, {}, schema);
assert.strictEqual(extraErrors.length, 1, 'Array with unevaluated item should have error');
});

test('deprecated keyword creates warning', async () => {
const schema = {
$schema: 'https://json-schema.org/draft/2019-09/schema',
type: 'object',
properties: {
oldField: {
type: 'string',
deprecated: true
},
newField: {
type: 'string'
}
}
};

// deprecated creates a deprecation warning
const { textDoc, jsonDoc } = toDocument('{"oldField": "value"}');
const errors = await ls.doValidation(textDoc, jsonDoc, {}, schema);
assert.strictEqual(errors.length, 1, 'Deprecated fields should create a warning');
assert.ok(errors[0].message.toLowerCase().includes('deprecated'), 'Warning should mention deprecated');
});
});
