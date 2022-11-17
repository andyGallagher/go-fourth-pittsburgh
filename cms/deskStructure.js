import S from "@sanity/desk-tool/structure-builder";

export default () =>
    S.list()
        .title("Content")
        .items([
            ...S.documentTypeListItems().filter((docType) => {
                return (
                    docType.getTitle() !== "Look Inside" &&
                    docType.getTitle() !== "Page Metadata"
                );
            }),
        ]);
