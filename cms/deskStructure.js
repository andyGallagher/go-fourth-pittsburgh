import S from "@sanity/desk-tool/structure-builder";

const hiddenDocTypes = (listItem) => !["lookInside"].includes(listItem.getId());

export default () =>
    S.list()
        .title("Content")
        .items([
            ...S.documentTypeListItems().filter((docType) => {
                return docType.getTitle() !== "__hidden Look Inside";
            }),
        ]);
