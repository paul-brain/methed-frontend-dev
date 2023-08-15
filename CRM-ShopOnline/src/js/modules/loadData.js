export const loadPosts = async (pageNum) => {
  let url = 'https://gorest.co.in/public-api/posts';

  if (pageNum) {
    url += `?page=${pageNum}`;
  }

  const result = await fetch(url);
  const data = await result.json();

  // const result = '{"code":200,"meta":{"pagination":{"total":2532,"pages":254,"page":1,"limit":10}},"data":[{"id":46022,"user_id":3016462,"title":"Tendo collum pel caste ustulo adipisci perferendis temeritas volo.","body":"Valeo celer vero. Alioqui crastinus patria. Artificiose aggero coniuratio. Textilis cubitum ullus. Cervus sordeo varius. Voluptates qui vir. Venia accommodo aut. Ambulo dignissimos sustineo. Censura reprehenderit volaticus. Somniculosus omnis caecus. Capto suppono auctus. Comparo antepono valetudo. Atque amplus adipisci. Votum caritas cometes. Vociferor voluptas despecto. Canis non suasoria. Adiuvo delego viriliter. Voluptates territo suppono."},{"id":46021,"user_id":3016462,"title":"Usque hic synagoga volup nisi una totus altus tot.","body":"At cimentarius certo. Curatio armarium velit. Hic thymum ut. Copiose coniuratio textor. Apostolus nisi utique. Vilis volo utpote. Ascisco dolores capio. Valetudo timidus ventosus. Ceno desino defigo. Tunc tamdiu delinquo. Ante degero quos. Temperantia tametsi ut. Derelinquo defluo benevolentia."},{"id":46019,"user_id":3016456,"title":"Color cinis vereor vinco hic carus ut.","body":"Voco aliqua rerum. Caecus deserunt id. Succurro termes vel. Alveus adsidue caecus. Abeo alii totidem. Via volva laborum. Culpa crux cras. Utroque curiositas timidus. Condico abscido tabesco. Aliquid colligo talio. Cumque calamitas delicate. Pecus conitor teres. Terga quo eum. Sollicito urbs copia."},{"id":46018,"user_id":3016456,"title":"Aliquam voluptas tyrannus validus comis.","body":"Audeo adstringo textor. Caste amor umquam. Tametsi uxor sortitus. Uberrime altus temeritas. Eum infit tabgo. Spero patrocinor subiungo. Defluo crebro demergo. Ulciscor vomica sed. Tolero turbo architecto. Recusandae tempora patruus. Curtus triumphus natus. Appositus uredo arguo. Aspernatur unde cariosus. Casus curvus velit. Est conforto balbus. Cariosus abundans dedico. Sed thesis acerbitas."},{"id":46017,"user_id":3016455,"title":"Tactus clibanus tribuo bardus succurro magni una demonstro.","body":"Volo benigne aut. Qui sum arma. Et acidus confero. Consequuntur delicate cogito. Comprehendo theatrum deficio. Surgo vos dolorem. Optio tandem curis. Asper cado clarus. Sumptus acceptus tyrannus. Valeo tamisium strenuus. Cura adstringo desolo."},{"id":46016,"user_id":3016453,"title":"Aro tepidus valetudo terminatio ago terreo aqua ancilla.","body":"Antea tabernus decor. Ut textus accusantium. Earum quaerat ullam. Ut decimus compello. Aut porro repudiandae. Cedo maxime spiritus. Causa paens suadeo. Volaticus verbum arbor. Statim capitulus vos. Comedo sequi decor. Tremo pax consectetur. Argentum cito tam. Decimus cubo varius. Adsuesco vereor commodo."},{"id":46014,"user_id":3016448,"title":"Pecto architecto compello tergeo solium stillicidium comptus minima cariosus.","body":"Crudelis pecus nisi. Voluptatum ter neque. Sequi vetus consequatur. Tabella cubo vindico. Amita comes cras. Crustulum truculenter somniculosus. Solitudo cur aureus. Strues vorago vinitor. Vestigium absconditus enim. Tamquam dedico templum. Fugit enim aut. Strenuus talus sui."},{"id":46013,"user_id":3016448,"title":"Sint voluptas causa teres coadunatio.","body":"Vitium demulceo veritas. Traho unde cicuta. Suasoria despecto error. Vigor vis comprehendo. Recusandae correptius alter. Culpo aduro ocer. Cura cotidie adicio. Contra laborum accusantium. Cariosus studio vinculum. Stultus corona vel. Vilis verumtamen curis. Ater degenero caste. Volutabrum bis assumenda. Crastinus minima vultuosus."},{"id":46012,"user_id":3016445,"title":"Victoria bardus aestas ara teres thorax quod.","body":"Magnam adultus enim. Auditor ceno cura. Annus accommodo ascisco. Placeat crur tamen. Cado totidem autus. Vero cubo supplanto. Depereo arbitro truculenter. Subseco tenus curatio. Adopto eum admiratio. Terreo qui vivo. Ullus corrigo accedo. Enim cauda censura. Pecunia demum tepesco. Subiungo uxor somnus. Cetera coepi triduana. Audax sperno et. Absconditus temptatio undique. Iusto autem antea."},{"id":46011,"user_id":3016445,"title":"Crinis omnis tenax spargo carmen totidem.","body":"Similique cohibeo aer. Certo talus vinculum. Verumtamen qui territo. Sub appono reiciendis. Venustas calcar aeternus. Theologus demo caecus. Tergo ratione commodi. Dens vigilo pecus. Ut ab qui. Illum stipes sed. Eum velum adipisci. Bestia angelus tabula. Id color accedo. Armo similique placeat. Consectetur aiunt et. Consequuntur vulgo corroboro. Curis voluptas cognatus. Blanditiis libero alius."}]}';
  // const data = JSON.parse(result);

  const {total, pages, page, limit} = data.meta.pagination;

  return {
    posts: data.data,
    totalPostCount: total,
    totalPageCount: 10, // pages,
    pageNum: page,
  };
};

export const loadArticle = async (ArticleId) => {
  let url = 'https://gorest.co.in/public-api/posts/' + ArticleId;

  const result = await fetch(url);
  const data = await result.json();

  const {id, user_id, title, body} = data.data;

  return {
    id,
    user_id,
    title,
    body,
  };
};

export const loadAuthor = async (user_id) => {
  let url = 'https://gorest.co.in/public-api/users/' + user_id;

  const result = await fetch(url);
  const data = await result.json();

  if (data.code === 404) {
    return 'Unknown author';
  } else {
    console.log(data);
    const {id, name, email, gender, status} = data.data;

    return name;
  }
};
