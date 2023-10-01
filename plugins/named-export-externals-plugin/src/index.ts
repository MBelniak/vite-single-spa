import {
  createPrinter,
  createSourceFile,
  factory,
  isImportDeclaration,
  NewLineKind,
  Node,
  ScriptTarget,
  StringLiteral,
} from "typescript";

export interface NamedExportExternalsPluginOptions {
  externals: string[];
}
export default function NamedExportExternalsPlugin(
  options: NamedExportExternalsPluginOptions
) {
  return {
    name: "named-export-externals-plugin", // this name will show up in logs and errors
    transform(code: string, id: string) {
      let program = createSourceFile(id, code, ScriptTarget.ESNext);
      program.forEachChild((node: Node) => {
        if (isImportDeclaration(node)) {
          if (
            options.externals.includes(
              (node.moduleSpecifier as StringLiteral).text
            ) &&
            !node.importClause?.isTypeOnly &&
            node.importClause?.name
          ) {
            if (node.importClause?.namedBindings) {
              // There are also named imports
              // TODO
            } else {
              // only default import
              const newImportClause = factory.createImportClause(
                false,
                undefined,
                factory.createNamedImports([
                  factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier(node.importClause.name.text)
                  ),
                ])
              );
              const updatedImport = factory.updateImportDeclaration(
                node,
                node.modifiers,
                newImportClause,
                node.moduleSpecifier,
                undefined
              );
              program = factory.updateSourceFile(program, [
                ...program.statements.slice(
                  0,
                  program.statements.indexOf(node)
                ),
                updatedImport,
                ...program.statements.slice(
                  program.statements.indexOf(node) + 1
                ),
              ]);
            }
          }
        }
      });
      return {
        code: createPrinter({ newLine: NewLineKind.LineFeed }).printFile(
          program
        ),
        map: null,
      };
    },
  };
}
