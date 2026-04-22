
-- Create sequences section -------------------------------------------------

CREATE SEQUENCE auth_group_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE auth_group_permissions_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE auth_permission_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE auth_systemuser_groups_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE auth_systemuser_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE auth_systemuser_permissions_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE content_type_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_customfield_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_customfield_obj_type_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_customfieldchoice_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_customfieldvalue_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_exporttemplate_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_graph_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


CREATE SEQUENCE extras_imageattachment_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;


-- Create tables section -------------------------------------------------

-- Table auth_group

CREATE TABLE lscms_auth_group(
 id Integer DEFAULT nextval('auth_group_id_seq'::regclass) NOT NULL,
 name Character varying(80) NOT NULL
)
;

-- Add keys for table auth_group

ALTER TABLE lscms_auth_group ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_group ADD CONSTRAINT auth_group_name_key UNIQUE (name)
;

-- Table auth_group_permissions

CREATE TABLE lscms_auth_group_permissions(
 id Integer DEFAULT nextval('auth_group_permissions_id_seq'::regclass) NOT NULL,
 group_id Integer NOT NULL,
 permission_id Integer NOT NULL
)
;

-- Add keys for table auth_group_permissions

ALTER TABLE lscms_auth_group_permissions ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_group_permissions ADD CONSTRAINT auth_group_permissions_group_id_permission_id_uniq UNIQUE (group_id,permission_id)
;

-- Table auth_permission

CREATE TABLE lscms_auth_permission(
 id Integer DEFAULT nextval('auth_permission_id_seq'::regclass) NOT NULL,
 name Character varying(255) NOT NULL,
 content_type_id Integer NOT NULL,
 codename Character varying(100) NOT NULL
)
;

-- Add keys for table auth_permission

ALTER TABLE lscms_auth_permission ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_permission ADD CONSTRAINT auth_permission_content_type_id_codename_uniq UNIQUE (content_type_id,codename)
;

-- Table auth_systemuser

CREATE TABLE lscms_auth_systemuser(
 id Integer DEFAULT nextval('auth_systemuser_id_seq'::regclass) NOT NULL,
 last_login Timestamp with time zone,
 is_superuser Boolean NOT NULL,
 username Character varying(150) NOT NULL,
 first_name Character varying(30),
 last_name Character varying(30),
 fullname Character varying(50),
 email Character varying(254),
 is_deleted Boolean DEFAULT False,
 date_joined Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL
)
;

-- Add keys for table auth_systemuser

ALTER TABLE lscms_auth_systemuser ADD CONSTRAINT auth_systemuser_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_systemuser ADD CONSTRAINT auth_systemuser_username_key UNIQUE (username)
;

-- Table auth_systemuser_groups

CREATE TABLE lscms_auth_systemuser_groups(
 id Integer DEFAULT nextval('auth_systemuser_groups_id_seq'::regclass) NOT NULL,
 systemuser_id Integer NOT NULL,
 group_id Integer NOT NULL
)
;

-- Add keys for table auth_systemuser_groups

ALTER TABLE lscms_auth_systemuser_groups ADD CONSTRAINT auth_systemuser_groups_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_systemuser_groups ADD CONSTRAINT auth_systemuser_groups_systemuser_id_group_id_uniq UNIQUE (systemuser_id,group_id)
;

-- Table auth_systemuser_permissions

CREATE TABLE lscms_auth_systemuser_permissions(
 id Integer DEFAULT nextval('auth_systemuser_permissions_id_seq'::regclass) NOT NULL,
 systemuser_id Integer NOT NULL,
 permission_id Integer NOT NULL
)
;

-- Add keys for table auth_systemuser_permissions

ALTER TABLE lscms_auth_systemuser_permissions ADD CONSTRAINT auth_systemuser_user_permissions_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_auth_systemuser_permissions ADD CONSTRAINT auth_systemuser_user_permissions_systemuser_id_permission_id_uniq UNIQUE (systemuser_id,permission_id)
;


-- Table lscms_manufacturer

CREATE SEQUENCE cms_manufacturer_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_manufacturer(
 id Integer DEFAULT nextval('cms_manufacturer_id_seq'::regclass) NOT NULL,
 name Character varying(50) NOT NULL
)
;

ALTER TABLE lscms_cms_manufacturer ADD CONSTRAINT cms_manufacturer_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_cms_manufacturer ADD CONSTRAINT cms_manufacturer_name_key UNIQUE (name)
;

ALTER SEQUENCE cms_manufacturer_id_seq OWNED BY lscms_cms_manufacturer.id;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE lscms_auth_group_permissions ADD CONSTRAINT auth_group_permissio_permission_id_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES lscms_auth_permission (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_auth_group_permissions ADD CONSTRAINT auth_group_permissions_group_id_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES lscms_auth_group (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_auth_systemuser_groups ADD CONSTRAINT auth_systemuser_groups_group_id_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES lscms_auth_group (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_auth_systemuser_groups ADD CONSTRAINT auth_systemuser_groups_systemuser_id_fk_auth_systemuser_id FOREIGN KEY (systemuser_id) REFERENCES lscms_auth_systemuser (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_auth_systemuser_permissions ADD CONSTRAINT auth_systemuser_user_permi_permission_id_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES lscms_auth_permission (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_auth_systemuser_permissions ADD CONSTRAINT auth_systemuser_user_permissions_systemuser_id_fk_auth_systemuser_id FOREIGN KEY (systemuser_id) REFERENCES lscms_auth_systemuser (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

-- Table content_type

CREATE TABLE lscms_content_type(
 id Integer DEFAULT nextval('content_type_id_seq'::regclass) NOT NULL,
 app_label Character varying(100) NOT NULL,
 model Character varying(100) NOT NULL
)
;

-- Add keys for table content_type

ALTER TABLE lscms_content_type ADD CONSTRAINT content_type_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_content_type ADD CONSTRAINT content_type_app_label_model_uniq UNIQUE (app_label,model)
;

-- Table extras_customfield

CREATE TABLE lscms_extras_customfield(
 id Integer DEFAULT nextval('extras_customfield_id_seq'::regclass) NOT NULL,
 type Smallint NOT NULL
        CONSTRAINT extras_customfield_type_check CHECK (type >= 0),
 name Character varying(50) NOT NULL,
 label Character varying(50) NOT NULL,
 description Character varying(100) NOT NULL,
 required Boolean NOT NULL,
 is_filterable Boolean NOT NULL,
 default_value Character varying(100) NOT NULL,
 weight Smallint NOT NULL
        CONSTRAINT extras_customfield_weight_check CHECK (weight >= 0)
)
;

CREATE INDEX extras_customfield_name_like ON lscms_extras_customfield (name varchar_pattern_ops)
;

-- Add keys for table extras_customfield

ALTER TABLE lscms_extras_customfield ADD CONSTRAINT extras_customfield_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_extras_customfield ADD CONSTRAINT extras_customfield_name_key UNIQUE (name)
;

-- Table extras_customfield_obj_type

CREATE TABLE lscms_extras_customfield_obj_type(
 id Integer DEFAULT nextval('extras_customfield_obj_type_id_seq'::regclass) NOT NULL,
 customfield_id Integer NOT NULL,
 contenttype_id Integer NOT NULL
)
;

-- Create indexes for table extras_customfield_obj_type

CREATE INDEX extras_customfield_obj_type_customfield_id_idx ON lscms_extras_customfield_obj_type (customfield_id)
;

CREATE INDEX extras_customfield_obj_type_contenttype_id_idx ON lscms_extras_customfield_obj_type (contenttype_id)
;

-- Add keys for table extras_customfield_obj_type

ALTER TABLE lscms_extras_customfield_obj_type ADD CONSTRAINT extras_customfield_obj_type_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_extras_customfield_obj_type ADD CONSTRAINT extras_customfield_obj_t_customfield_id_contentty_77878958_uniq UNIQUE (customfield_id,contenttype_id)
;

-- Table extras_customfieldchoice

CREATE TABLE lscms_extras_customfieldchoice(
 id Integer DEFAULT nextval('extras_customfieldchoice_id_seq'::regclass) NOT NULL,
 value Character varying(100) NOT NULL,
 weight Smallint NOT NULL
        CONSTRAINT extras_customfieldchoice_weight_check CHECK (weight >= 0),
 field_id Integer NOT NULL
)
;

-- Create indexes for table extras_customfieldchoice

CREATE INDEX extras_customfieldchoice_field_id_idx ON lscms_extras_customfieldchoice (field_id)
;

-- Add keys for table extras_customfieldchoice

ALTER TABLE lscms_extras_customfieldchoice ADD CONSTRAINT extras_customfieldchoice_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_extras_customfieldchoice ADD CONSTRAINT extras_customfieldchoice_field_id_value_uniq UNIQUE (field_id,value)
;

-- Table extras_customfieldvalue

CREATE TABLE lscms_extras_customfieldvalue(
 id Integer DEFAULT nextval('extras_customfieldvalue_id_seq'::regclass) NOT NULL,
 obj_id Integer NOT NULL
        CONSTRAINT extras_customfieldvalue_obj_id_check CHECK (obj_id >= 0),
 serialized_value Character varying(255) NOT NULL,
 field_id Integer NOT NULL,
 obj_type_id Integer NOT NULL
)
;

-- Create indexes for table extras_customfieldvalue

CREATE INDEX extras_customfieldvalue_field_id_idx ON lscms_extras_customfieldvalue (field_id)
;

CREATE INDEX extras_customfieldvalue_obj_type_id_idx ON lscms_extras_customfieldvalue (obj_type_id)
;

-- Add keys for table extras_customfieldvalue

ALTER TABLE lscms_extras_customfieldvalue ADD CONSTRAINT extras_customfieldvalue_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_extras_customfieldvalue ADD CONSTRAINT extras_customfieldvalue_field_id_obj_type_id_obj_uniq UNIQUE (field_id,obj_type_id,obj_id)
;

-- Table extras_exporttemplate

CREATE TABLE lscms_extras_exporttemplate(
 id Integer DEFAULT nextval('extras_exporttemplate_id_seq'::regclass) NOT NULL,
 name Character varying(100) NOT NULL,
 template_code Text NOT NULL,
 mime_type Character varying(15) NOT NULL,
 file_extension Character varying(15) NOT NULL,
 content_type_id Integer NOT NULL,
 description Character varying(200) NOT NULL
)
;

-- Create indexes for table extras_exporttemplate

CREATE INDEX extras_exporttemplate_content_type_id_idx ON lscms_extras_exporttemplate (content_type_id)
;

-- Add keys for table extras_exporttemplate

ALTER TABLE lscms_extras_exporttemplate ADD CONSTRAINT extras_exporttemplate_pkey PRIMARY KEY (id)
;

ALTER TABLE lscms_extras_exporttemplate ADD CONSTRAINT extras_exporttemplate_content_type_id_name_uniq UNIQUE (content_type_id,name)
;

-- Table extras_graph

CREATE TABLE lscms_extras_graph(
 id Integer DEFAULT nextval('extras_graph_id_seq'::regclass) NOT NULL,
 type Smallint NOT NULL
        CONSTRAINT extras_graph_type_check CHECK (type >= 0),
 weight Smallint NOT NULL
        CONSTRAINT extras_graph_weight_check CHECK (weight >= 0),
 name Character varying(100) NOT NULL,
 source Character varying(500) NOT NULL,
 link Character varying(200) NOT NULL
)
;

-- Add keys for table extras_graph

ALTER TABLE lscms_extras_graph ADD CONSTRAINT extras_graph_pkey PRIMARY KEY (id)
;

-- Table extras_imageattachment

CREATE TABLE lscms_extras_imageattachment(
 id Integer DEFAULT nextval('extras_imageattachment_id_seq'::regclass) NOT NULL,
 object_id Integer NOT NULL
        CONSTRAINT extras_imageattachment_object_id_check CHECK (object_id >= 0),
 image Character varying(100) NOT NULL,
 image_height Smallint NOT NULL
        CONSTRAINT extras_imageattachment_image_height_check CHECK (image_height >= 0),
 image_width Smallint NOT NULL
        CONSTRAINT extras_imageattachment_image_width_check CHECK (image_width >= 0),
 name Character varying(50) NOT NULL,
 created Timestamp with time zone NOT NULL,
 content_type_id Integer NOT NULL
)
;

-- Create indexes for table extras_imageattachment

CREATE INDEX extras_imageattachment_content_type_id_idx ON lscms_extras_imageattachment (content_type_id)
;

-- Add keys for table extras_imageattachment

ALTER TABLE lscms_extras_imageattachment ADD CONSTRAINT extras_imageattachment_pkey PRIMARY KEY (id)
;


ALTER TABLE lscms_extras_customfield_obj_type ADD CONSTRAINT extras_customfield_o_contenttype_id_fk_co FOREIGN KEY (contenttype_id) REFERENCES lscms_content_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_extras_customfield_obj_type ADD CONSTRAINT extras_customfield_o_customfield_id_fk_extras_cu FOREIGN KEY (customfield_id) REFERENCES lscms_extras_customfield (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_extras_customfieldchoice ADD CONSTRAINT extras_customfieldch_field_id_fk_extras_cu FOREIGN KEY (field_id) REFERENCES lscms_extras_customfield (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_extras_customfieldvalue ADD CONSTRAINT extras_customfieldva_obj_type_id_fk_co FOREIGN KEY (obj_type_id) REFERENCES lscms_content_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_extras_customfieldvalue ADD CONSTRAINT extras_customfieldva_field_id_fk_extras_cu FOREIGN KEY (field_id) REFERENCES lscms_extras_customfield (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

ALTER TABLE lscms_extras_imageattachment ADD CONSTRAINT extras_imageattachme_content_type_id_fk_co FOREIGN KEY (content_type_id) REFERENCES lscms_content_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
;

-- Create tables section -------------------------------------------------

-- Table ipam_ipaddress

CREATE SEQUENCE ipam_ipaddress_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_ipam_ipaddress(
 id Integer DEFAULT nextval('ipam_ipaddress_id_seq'::regclass) NOT NULL,
 created Date DEFAULT CURRENT_DATE NOT NULL,
 last_updated Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL,
 address Inet NOT NULL,
 description  Character varying(100),
 is_usable boolean DEFAULT true,
 is_deleted Boolean DEFAULT False
)
;


-- Add keys for table ipam_ipaddress
ALTER TABLE lscms_ipam_ipaddress ADD CONSTRAINT ipam_ipaddress_pkey PRIMARY KEY (id)
;


-- Create foreign keys (relationships) section -------------------------------------------------

ALTER SEQUENCE auth_group_id_seq OWNED BY lscms_auth_group.id;

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY lscms_auth_group_permissions.id;

ALTER SEQUENCE auth_permission_id_seq OWNED BY lscms_auth_permission.id;

ALTER SEQUENCE auth_systemuser_groups_id_seq OWNED BY lscms_auth_systemuser_groups.id;

ALTER SEQUENCE auth_systemuser_id_seq OWNED BY lscms_auth_systemuser.id;

ALTER SEQUENCE auth_systemuser_permissions_id_seq OWNED BY lscms_auth_systemuser_permissions.id;

ALTER SEQUENCE content_type_id_seq OWNED BY lscms_content_type.id;

ALTER SEQUENCE extras_customfield_id_seq OWNED BY lscms_extras_customfield.id;

ALTER SEQUENCE extras_customfield_obj_type_id_seq OWNED BY lscms_extras_customfield_obj_type.id;

ALTER SEQUENCE extras_customfieldchoice_id_seq OWNED BY lscms_extras_customfieldchoice.id;

ALTER SEQUENCE extras_customfieldvalue_id_seq OWNED BY lscms_extras_customfieldvalue.id;

ALTER SEQUENCE extras_exporttemplate_id_seq OWNED BY lscms_extras_exporttemplate.id;

ALTER SEQUENCE extras_graph_id_seq OWNED BY lscms_extras_graph.id;

ALTER SEQUENCE extras_imageattachment_id_seq OWNED BY lscms_extras_imageattachment.id;

ALTER SEQUENCE ipam_ipaddress_id_seq OWNED BY lscms_ipam_ipaddress.id
;
---------------------------------------------------- SYSTEM ADMINISTRATION--------------------------------------

CREATE SEQUENCE common_code_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_common_code(
 id Integer DEFAULT nextval('common_code_id_seq'::regclass) NOT NULL,
 group_id Integer,
 name Character varying(100) NOT NULL,
 description Character varying(100),
 CONSTRAINT common_code_pkey PRIMARY KEY (id),
 CONSTRAINT common_code_group_id_fk_co FOREIGN KEY (group_id) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT common_code_group_id_name_uniq UNIQUE (group_id, name)
);
ALTER SEQUENCE common_code_id_seq OWNED BY lscms_common_code.id
;

-------------------------------------------------------------------
CREATE SEQUENCE mainpage_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_mainpage
(
id INTEGER DEFAULT nextval('mainpage_id_seq'::regclass) NOT NULL,
created Date DEFAULT CURRENT_DATE NOT NULL,
last_updated Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL,
json_data Text,
name Character varying(150) NOT NULL,
description Text NOT NULL,
layout Integer NOT NULL,
theme Integer NOT NULL,
is_deleted Boolean DEFAULT False,
creator_id INTEGER NOT NULL,
CONSTRAINT mainpage_pkey PRIMARY KEY (id),
CONSTRAINT mainpage_creator_id_fk_co FOREIGN KEY (creator_id) REFERENCES "lscms_auth_systemuser" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
CONSTRAINT mainpage_layout_fk_co FOREIGN KEY (layout) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
CONSTRAINT mainpage_theme_fk_co FOREIGN KEY (theme) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX mainpage_name_ba5a7082_like ON lscms_mainpage (name varchar_pattern_ops)
;
ALTER SEQUENCE mainpage_id_seq OWNED BY lscms_mainpage.id
;

CREATE TABLE lscms_systemuser_mainpage(
 systemuser_id Integer NOT NULL,
 mainpage_id Integer NOT NULL,
 is_default Boolean DEFAULT False,
 CONSTRAINT systemuser_mainpage_systemuser_id_fk_co FOREIGN KEY (systemuser_id) REFERENCES "lscms_auth_systemuser" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_mainpage_mainpage_id_fk_co FOREIGN KEY (mainpage_id) REFERENCES "lscms_mainpage" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_mainpage_systemuser_id_mainpage_id_uniq UNIQUE (systemuser_id, mainpage_id)
);

CREATE SEQUENCE widget_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_widget(
 id Integer DEFAULT nextval('widget_id_seq'::regclass) NOT NULL,
 widgettype_id Integer NOT NULL,
 content_data Text NOT NULL,
 option_data Text NOT NULL,
 CONSTRAINT widget_pkey PRIMARY KEY (id),
 CONSTRAINT widgettype_id_fk_co FOREIGN KEY (widgettype_id) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);


CREATE TABLE lscms_mainpage_widget
(
mainpage_id Integer NOT NULL,
widget_id Integer,
description Text,
title Character varying(150),
widgettype_id Integer,
rowspan  Smallint NOT NULL
        CONSTRAINT mainpage_widget_rowspan_check CHECK (rowspan >= 1),
colspan  Smallint NOT NULL
        CONSTRAINT mainpage_widget_colspan_check CHECK (colspan >= 1),
rowindex  Smallint NOT NULL
        CONSTRAINT mainpage_widget_rowindex_check CHECK (rowindex >= 0),
colindex  Smallint NOT NULL
        CONSTRAINT mainpage_widget_colindex_check CHECK (colindex >= 0),
CONSTRAINT mainpage_widget_widget_id_mainpage_id_uniq UNIQUE (widget_id, mainpage_id),
CONSTRAINT mainpage_widget_mainpage_id_fk_co FOREIGN KEY (mainpage_id) REFERENCES "lscms_mainpage" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
CONSTRAINT mainpage_widget_widget_id_fk_co FOREIGN KEY (widget_id) REFERENCES "lscms_widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
CONSTRAINT mainpage_widget_widgettype_id_fk FOREIGN KEY (widgettype_id) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

ALTER SEQUENCE widget_id_seq OWNED BY lscms_widget.id
;

---------------------------------------------------- 사이트 관리 --------------------------------------
CREATE SEQUENCE cms_region_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_cms_region(
 id Integer DEFAULT nextval('cms_region_id_seq'::regclass) NOT NULL,
 name Character varying(50) NOT NULL,
 level Integer NOT NULL
        CONSTRAINT cms_region_level_check CHECK (level >= 0),
 level_rank Integer NOT NULL
        CONSTRAINT cms_region_level_rank_check CHECK (level_rank >= 0),
 parent_id Integer,
 is_deleted Boolean DEFAULT False,
 CONSTRAINT cms_region_pkey PRIMARY KEY (id),
 CONSTRAINT cms_region_parent_id_fk_co FOREIGN KEY (parent_id) REFERENCES "lscms_cms_region" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;
CREATE INDEX cms_region_name_like ON lscms_cms_region (name varchar_pattern_ops)
;
ALTER SEQUENCE cms_region_id_seq OWNED BY lscms_cms_region.id
;

CREATE SEQUENCE cms_site_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_site(
 id Integer DEFAULT nextval('cms_site_id_seq'::regclass) NOT NULL,
 created Date DEFAULT CURRENT_DATE NOT NULL,
 last_updated Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL,
 name Character varying(50) NOT NULL,
 description Text,
 region_id Integer,
 sitetreejson_data Text,
 image_site Text,
 is_deleted Boolean DEFAULT False,
 CONSTRAINT cms_site_pkey PRIMARY KEY (id),
 CONSTRAINT cms_site_region_id_fk_co FOREIGN KEY (region_id) REFERENCES "lscms_cms_region" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;

CREATE INDEX cms_site_name_like ON lscms_cms_site (name varchar_pattern_ops)
;
CREATE INDEX cms_site_region_id_idx ON lscms_cms_site (region_id)
;
ALTER SEQUENCE cms_site_id_seq OWNED BY lscms_cms_site.id
;

CREATE SEQUENCE cms_sitetree_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_cms_sitetree(
 id Integer DEFAULT nextval('cms_sitetree_id_seq'::regclass) NOT NULL,
 site_id Integer,
 type_id Integer NOT NULL,  --CMS Category Type 'building, floor, area, product, etc',
 last_updated Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL,
 level Integer NOT NULL
        CONSTRAINT cms_sitetree_level_check CHECK (level >= 0),
 level_rank Integer NOT NULL
        CONSTRAINT cms_sitetree_level_rank_check CHECK (level_rank >= 0),
 parent_id Integer,
 CONSTRAINT cms_sitetree_pkey PRIMARY KEY (id),
 CONSTRAINT cms_sitetree_parent_id_fk_co FOREIGN KEY (parent_id) REFERENCES "lscms_cms_sitetree" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT cms_sitetree_type_id_fk_co FOREIGN KEY (type_id) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_site_id_fk_co FOREIGN KEY (site_id) REFERENCES "lscms_cms_site" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;

ALTER SEQUENCE cms_sitetree_id_seq OWNED BY lscms_cms_sitetree.id
;

CREATE SEQUENCE cms_sitetree_placement_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_sitetree_placement(
 id Integer DEFAULT nextval('cms_sitetree_placement_id_seq'::regclass) NOT NULL,
 sitetree_id Integer,   --floor, area, rack space
 json_data Text NOT NULL,
 CONSTRAINT cms_sitetree_placement_pkey PRIMARY KEY (id),
 CONSTRAINT cms_sitetree_placement_sitetree_id_fk_co FOREIGN KEY (sitetree_id) REFERENCES "lscms_cms_sitetree" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;

----------------------------------------------IPAM 관리----------------------

CREATE SEQUENCE ipam_enduser_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_ipam_enduser(
 id Integer DEFAULT nextval('ipam_enduser_id_seq'::regclass) NOT NULL,
 name Character varying(50) NOT NULL,
 empno Character varying(20),
 mac_address Macaddr,
 full_name Character varying(30),
 contact Character varying(30),
 email Character varying(254),
 asset_tag Character varying(50),
 ip_address Inet,
 CONSTRAINT ipam_enduser_pkey PRIMARY KEY (id)
)
;
ALTER SEQUENCE ipam_enduser_id_seq OWNED BY lscms_ipam_enduser.id
;

ALTER TABLE lscms_ipam_enduser ADD CONSTRAINT ipam_enduser_name_uniq UNIQUE (name);
ALTER TABLE lscms_ipam_enduser ADD CONSTRAINT ipam_enduser_ip_address_uniq UNIQUE (ip_address);
CREATE INDEX ipam_enduser_name_like ON lscms_ipam_enduser (name varchar_pattern_ops);
CREATE INDEX ipam_enduser_asset_tag_like ON lscms_ipam_enduser (asset_tag varchar_pattern_ops);


CREATE SEQUENCE ipam_network_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_ipam_network(
 id Integer DEFAULT nextval('ipam_network_id_seq'::regclass) NOT NULL,
 name Character varying(30) NOT NULL,
 network Character varying(30) NOT NULL, --네트워크 대역?
 subnet Character varying(30) NOT NULL,
 start_ipaddress Inet NOT NULL,
 end_ipaddress Inet NOT NULL,
 description Text,
 is_deleted Boolean DEFAULT False,
 created Date DEFAULT CURRENT_DATE NOT NULL,
 last_updated Timestamp with time zone default CURRENT_TIMESTAMP NOT NULL,
 CONSTRAINT ipam_network_pkey PRIMARY KEY (id)
)
;
CREATE INDEX ipam_network_name_like ON lscms_ipam_network (name varchar_pattern_ops);

alter TABLE lscms_ipam_ipaddress add column network_id Integer;
ALTER TABLE lscms_ipam_ipaddress ADD CONSTRAINT ipam_ipaddress_network_id_fk FOREIGN KEY (network_id) REFERENCES "lscms_ipam_network" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED;

----------------------------------------------선번장 운영 관리----------------------
CREATE TABLE lscms_systemuser_cms_site(
 systemuser_id Integer NOT NULL,
 cms_site_id Integer NOT NULL,
 CONSTRAINT systemuser_cms_site_systemuser_id_fk_co FOREIGN KEY (systemuser_id) REFERENCES "lscms_auth_systemuser" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_cms_site_cms_site_id_fk_co FOREIGN KEY (cms_site_id) REFERENCES "lscms_cms_site" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_cms_site_systemuser_id_mainpage_id_uniq UNIQUE (systemuser_id, cms_site_id)
);

--name: 'chart', img: './symbols/chart.json', colSpan: 1, rowSpan: 1}

CREATE SEQUENCE widget_sample_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_widget_sample(
 id Integer DEFAULT nextval('widget_sample_id_seq'::regclass) NOT NULL,
 widget_type Integer NOT NULL,
 name Character varying(50) NOT NULL,
 img Text NOT NULL,
 colSpan Integer NOT NULL,
 rowSpan Integer NOT NULL,
 CONSTRAINT widget_sample_pkey PRIMARY KEY (id),
 CONSTRAINT lscms_widget_sample_widget_type_fk FOREIGN KEY (widget_type) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

ALTER SEQUENCE widget_sample_id_seq OWNED BY lscms_widget_sample.id
;

CREATE SEQUENCE widget_layout_size_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_widget_layout_size(
 id Integer DEFAULT nextval('widget_layout_size_id_seq'::regclass) NOT NULL,
 widget_type Integer NOT NULL,
 layout_size Integer NOT NULL,
 CONSTRAINT widget_layout_size_pkey PRIMARY KEY (id),
 CONSTRAINT lscms_widget_layout_size_widget_type_fk FOREIGN KEY (widget_type) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT lscms_widget_layout_size_layout_size_fk FOREIGN KEY (layout_size) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

ALTER SEQUENCE widget_layout_size_id_seq OWNED BY lscms_widget_layout_size.id
;


CREATE SEQUENCE cms_mapwidget_hierarchy_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_cms_mapwidget_hierarchy(
 id Integer DEFAULT nextval('cms_mapwidget_hierarchy_id_seq'::regclass) NOT NULL,
 mapwidget_parent_id Integer,
 mapwidget_id Integer NOT NULL,
 type Integer NOT NULL,
 displayname Character varying(50),
 CONSTRAINT cms_mapwidget_hierarchy_pkey PRIMARY KEY (id),
 CONSTRAINT cmms_mapwidget_hierarchy_type_fk_co FOREIGN KEY (type) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cmms_mapwidget_hierarchy_mapwidget_id_fk_co FOREIGN KEY (mapwidget_id) REFERENCES "lscms_widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cmms_mapwidget_hierarchy_mapwidget_parent_id_fk_co FOREIGN KEY (mapwidget_parent_id) REFERENCES "lscms_widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;
ALTER SEQUENCE cms_mapwidget_hierarchy_id_seq OWNED BY lscms_cms_mapwidget_hierarchy.id
;


CREATE TABLE lscms_cms_product_tree (
 content_data Text NOT NULL,
 created Date DEFAULT CURRENT_DATE NOT NULL
);

CREATE SEQUENCE cms_category_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_category
(
    id integer NOT NULL DEFAULT nextval('cms_category_id_seq'::regclass),
    type_id integer NOT NULL,
    name character varying(50) NOT NULL,
    is_deleted boolean DEFAULT false,
    is_product boolean DEFAULT true,
    is_nms boolean DEFAULT False,
    created date NOT NULL DEFAULT ('now'::text)::date,
    last_updated timestamp with time zone NOT NULL DEFAULT now(),
    description text,
    image_tree text,
    image_default text,
    manufacturer_id integer,
    model character varying(50),
    image_map text,
    total_port integer,
    u_height integer,
    u_size integer,
    full_depth boolean,
    image_rack_front text,
    image_rack_rear text,
    dimensions character varying(50),
    image_linkage_connection text,
    rack_type_id Integer,
    CONSTRAINT cms_category_pkey PRIMARY KEY (id),
    CONSTRAINT cms_category_manufacturer_id_fk FOREIGN KEY (manufacturer_id)
        REFERENCES lscms_cms_manufacturer (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT cms_category_rack_type_id_fk FOREIGN KEY (rack_type_id) 
	REFERENCES "lscms_common_code" ("id") MATCH SIMPLE
	ON DELETE NO ACTION 
	ON UPDATE NO ACTION 
	DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT cms_category_type_id_fk_co FOREIGN KEY (type_id)
        REFERENCES lscms_common_code (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX cms_category_name_like
    ON lscms_cms_category (name varchar_pattern_ops);
ALTER SEQUENCE cms_category_id_seq OWNED BY lscms_cms_category.id
;

CREATE SEQUENCE cms_sitetree_legimate_child_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_sitetree_legimate_child(
 id Integer DEFAULT nextval('cms_sitetree_legimate_child_id_seq'::regclass) NOT NULL,
 parent_type Integer,
 child_type Integer NOT NULL,
 CONSTRAINT cms_sitetree_legimate_child_pkey PRIMARY KEY (id),
 CONSTRAINT cms_sitetree_legimate_child_parent_type_fk FOREIGN KEY (parent_type) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_legimate_child_child_type_fk FOREIGN KEY (child_type) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_legimate_child_parent_type_child_type_uniq UNIQUE (parent_type, child_type)

);

ALTER SEQUENCE cms_sitetree_legimate_child_id_seq OWNED BY lscms_cms_sitetree_legimate_child.id;

CREATE SEQUENCE cms_entity_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_cms_entity
(
    id integer NOT NULL DEFAULT nextval('cms_entity_id_seq'::regclass),
    name Character varying(64) NOT NULL,
    comments text,
    asset_tag Character varying(50),
    category_id integer NOT NULL,
    displayname Character varying(50),
    created date NOT NULL DEFAULT ('now'::text)::date,
    last_updated timestamp with time zone NOT NULL DEFAULT now(),
    opm_category Character varying(50),
    shape  Character varying(300),
    ip Character varying(50),
    is_deleted Boolean DEFAULT False,
    opm_name Character varying(50),
    CONSTRAINT cms_entity_pkey PRIMARY KEY (id),
    CONSTRAINT cms_entity_category_id_fk FOREIGN KEY (category_id)
        REFERENCES lscms_cms_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX cms_entity_asset_tag_like     ON lscms_cms_entity      (asset_tag varchar_pattern_ops);

CREATE INDEX cms_entity_name_like     ON lscms_cms_entity      (name varchar_pattern_ops);

ALTER SEQUENCE cms_entity_id_seq OWNED BY lscms_cms_entity.id;


alter TABLE lscms_cms_sitetree add column entity_id Integer NOT NULL;
ALTER TABLE lscms_cms_sitetree ADD CONSTRAINT cms_sitetree_entity_id_fk FOREIGN KEY (entity_id) REFERENCES lscms_cms_entity (id) ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED;


CREATE SEQUENCE cms_sitetree_palcement_entity_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_sitetree_placement_entity(
 id Integer DEFAULT nextval('cms_sitetree_palcement_entity_id_seq'::regclass) NOT NULL,
 sitetree_placement_id Integer NOT NULL,
 entity_id Integer NOT NULL,
 CONSTRAINT cms_sitetree_placement_entity_pkey PRIMARY KEY (id),
 CONSTRAINT cms_sitetree_placement_entity_sitetree_placement_id_fk_co FOREIGN KEY (sitetree_placement_id) REFERENCES "lscms_cms_sitetree_placement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_placement_entity_entity_id_fk_co FOREIGN KEY (entity_id) REFERENCES "lscms_cms_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_placement_entity_sitetree_placement_id_entity_id_uniq UNIQUE (sitetree_placement_id, entity_id)
)
;
ALTER SEQUENCE cms_sitetree_palcement_entity_id_seq OWNED BY lscms_cms_sitetree_placement_entity.id
;

--lscms_cms_interface
CREATE SEQUENCE cms_interface_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_interface(
 id Integer DEFAULT nextval('cms_interface_id_seq'::regclass) NOT NULL,
 name Character varying(64) NOT NULL,
 description Character varying(100),
 entity_id Integer,
 mac_address Macaddr,
 ifindex Integer,
 enabled Boolean NOT NULL DEFAULT true,
 mtu Smallint
        CONSTRAINT cms_interface_mtu_check CHECK (mtu >= 0),
 CONSTRAINT cms_interface_entity_id_fk_co FOREIGN KEY (entity_id) REFERENCES "lscms_cms_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
);
ALTER SEQUENCE cms_interface_id_seq OWNED BY lscms_cms_interface.id;
CREATE INDEX cms_interface_entity_id ON lscms_cms_interface (entity_id);
ALTER TABLE lscms_cms_interface ADD CONSTRAINT cms_interface_pkey PRIMARY KEY (id);
ALTER TABLE lscms_cms_interface ADD CONSTRAINT cms_interface_entity_id_name_uniq UNIQUE (entity_id, name);

---------------------

CREATE SEQUENCE cms_linkage_connection_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_linkage_connection(
 id Integer DEFAULT nextval('cms_linkage_connection_id_seq'::regclass) NOT NULL,
 json_data Text,
 is_deleted Boolean DEFAULT False,
 CONSTRAINT cms_linkage_connection_pkey PRIMARY KEY (id)
)
;
ALTER SEQUENCE cms_linkage_connection_id_seq OWNED BY lscms_cms_linkage_connection.id
;

CREATE TABLE lscms_cms_linkage_connection_patchpanel(
 linkage_connection_id Integer NOT NULL,
 sitetree_id Integer NOT NULL,
 is_basis Boolean DEFAULT False,
 CONSTRAINT cms_linkage_connection_patchpanel_sitetree_id_fk_co FOREIGN KEY (sitetree_id) REFERENCES "lscms_cms_sitetree" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_patchpanel_linkage_connection_id_fk_co FOREIGN KEY (linkage_connection_id) REFERENCES "lscms_cms_linkage_connection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;


CREATE TABLE lscms_cms_linkage_connection_interface(
 linkage_connection_id Integer NOT NULL,
 interface_a_id Integer NOT NULL,
 connector_id Integer NOT NULL,
 interface_b_id Integer NOT NULL,
 CONSTRAINT cms_linkage_connection_interface_linkage_connection_id_fk_co FOREIGN KEY (linkage_connection_id) REFERENCES "lscms_cms_linkage_connection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_connector_id_fk_co FOREIGN KEY (connector_id) REFERENCES "lscms_cms_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_interface_a_id_fk_co FOREIGN KEY (interface_a_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_interface_b_id_fk_co FOREIGN KEY (interface_b_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;
CREATE INDEX cms_linkage_connection_interface_interface_a_id ON lscms_cms_linkage_connection_interface (interface_a_id);
CREATE INDEX cms_linkage_connection_interface_interface_b_id ON lscms_cms_linkage_connection_interface (interface_b_id);

CREATE SEQUENCE cms_linkage_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_linkage(
 id Integer DEFAULT nextval('cms_linkage_id_seq'::regclass) NOT NULL,
 entity_a_id Integer NOT NULL,
 entity_b_id Integer NOT NULL,
 CONSTRAINT cms_linkage_pkey PRIMARY KEY (id),
 CONSTRAINT cms_linkage_sitetree_a_id_fk_co FOREIGN KEY (entity_a_id) REFERENCES "lscms_cms_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_sitetree_b_id_fk_co FOREIGN KEY (entity_b_id) REFERENCES "lscms_cms_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_sitetree_a_id_sitetree_b_id_uniq UNIQUE (entity_a_id, entity_b_id)
)
;
ALTER SEQUENCE cms_linkage_id_seq OWNED BY lscms_cms_linkage.id
;

CREATE TABLE lscms_cms_linkage_detail(
 linkage_id Integer NOT NULL,
 interface_a_id Integer NOT NULL,
 interface_b_id Integer NOT NULL,
 CONSTRAINT cms_linkage_detail_linkage_idb_fk_co FOREIGN KEY (linkage_id) REFERENCES "lscms_cms_linkage" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_detail_interface_a_id_fk_co FOREIGN KEY (interface_a_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_detail_interface_b_id_fk_co FOREIGN KEY (interface_b_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;
CREATE INDEX cms_linkage_detail_interface_a_id ON lscms_cms_linkage_detail (interface_a_id);
CREATE INDEX cms_linkage_detail_interface_b_id ON lscms_cms_linkage_detail (interface_b_id);

CREATE OR REPLACE FUNCTION macaddr_invarchar(varchar) 
RETURNS macaddr LANGUAGE SQL AS '
    SELECT macaddr_in($1::cstring);
' IMMUTABLE;

CREATE CAST (varchar AS macaddr) WITH FUNCTION macaddr_invarchar(varchar) AS IMPLICIT;

CREATE SEQUENCE ipam_accesslist_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_ipam_accesslist(
 id Integer DEFAULT nextval('ipam_accesslist_id_seq'::regclass) NOT NULL,
 ip_address Inet NOT NULL,
 mac_address Macaddr NOT NULL,
 enduser_mac Macaddr,
 access_time Timestamp with time zone NOT NULL,
 enduser_name Character varying(50) NOT NULL,
 CONSTRAINT ipam_accesslist_pkey PRIMARY KEY (id)
)
;
ALTER SEQUENCE ipam_accesslist_id_seq OWNED BY lscms_ipam_accesslist.id
;
CREATE INDEX lscms_ipam_accesslist_ip_address_idx ON lscms_ipam_accesslist (ip_address)
;
CREATE INDEX lscms_ipam_accesslist_mac_address_idx ON lscms_ipam_accesslist (mac_address)
;
CREATE INDEX lscms_ipam_accesslist_enduser_name_idx ON lscms_ipam_accesslist (enduser_name)
;

CREATE SEQUENCE ipam_accesshistory_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_ipam_accesshistory(
 id Integer DEFAULT nextval('ipam_accesshistory_id_seq'::regclass) NOT NULL,
 ip_address Inet NOT NULL,
 mac_address Macaddr NOT NULL,
 enduser_name Character varying(50) NOT NULL,
 enduser_mac Macaddr,
 access_begin Timestamp with time zone NOT NULL,
 access_end Timestamp with time zone NOT NULL,
 CONSTRAINT ipam_accesshistory_pkey PRIMARY KEY (id)
)
;
ALTER SEQUENCE ipam_accesshistory_id_seq OWNED BY lscms_ipam_accesshistory.id
;

CREATE INDEX lscms_ipam_accesshistory_ip_address_idx ON lscms_ipam_accesshistory (ip_address)
;
CREATE INDEX lscms_ipam_accesshistory_mac_address_idx ON lscms_ipam_accesshistory (mac_address)
;
CREATE INDEX lscms_ipam_accesshistory_enduser_name_idx ON lscms_ipam_accesshistory (enduser_name)
;

CREATE TABLE lscms_systemuser_mainpage_admin_default(
 systemuser_id Integer NOT NULL,
 mainpage_id Integer NOT NULL,
 CONSTRAINT systemuser_mainpage_admin_default_systemuser_id_fk_co FOREIGN KEY (systemuser_id) REFERENCES "lscms_auth_systemuser" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_mainpage_admin_default_mainpage_id_fk_co FOREIGN KEY (mainpage_id) REFERENCES "lscms_mainpage" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT systemuser_mainpage_admin_default_systemuser_id_mainpage_id_uniq UNIQUE (systemuser_id, mainpage_id)
);

CREATE SEQUENCE cms_mapwidget_entity_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_mapwidget_entity
(
    id integer NOT NULL DEFAULT nextval('cms_mapwidget_entity_id_seq'::regclass),
    mapwidget_id integer NOT NULL,
    entity_id integer NOT NULL,
    displayname character varying(50),
    CONSTRAINT cms_mapwidget_entity_pkey PRIMARY KEY (id),
    CONSTRAINT mapwidget_entity_mapwidget_id_entity_id_uniq UNIQUE (mapwidget_id, entity_id),
    CONSTRAINT mapwidget_entity_mapwidget_id_fk FOREIGN KEY (mapwidget_id)
        REFERENCES lscms_widget (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT mapwidget_entity_entity_id_fk_co FOREIGN KEY (entity_id)
        REFERENCES lscms_cms_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);
ALTER SEQUENCE cms_mapwidget_entity_id_seq OWNED BY lscms_cms_mapwidget_entity.id
;


--- Scan History 테이블 스키마 생성

CREATE SEQUENCE ipam_scanhistory_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;

CREATE TABLE lscms_ipam_scanhistory
(
    id integer NOT NULL DEFAULT nextval('ipam_scanhistory_id_seq'::regclass),
    network_id integer NOT NULL,
    scan_begin timestamp with time zone,
    scan_end timestamp with time zone,
    scan_result integer NOT NULL,   -- In Progress, Success, Fail
    CONSTRAINT ipam_scanhistory_pkey PRIMARY KEY (id)
);

-- IPAM 관련 테이블 생성

CREATE TABLE lscms_mac_to_ip 
(
   	 --network_id integer,
     mac_address character varying(50),
     ip_address character varying(20),
     switch_name character varying(50)
);

CREATE TABLE lscms_mac_to_port
(
     peer_mac_address character varying(50),
     port_no character varying(10),
     switch_name character varying(50)
);

CREATE TABLE lscms_port_to_ifindex
(
     port_no character varying(10),
     if_index character varying(20),
     switch_name character varying(50)
);

CREATE TABLE lscms_cms_sitetree_rackspace_position(
 sitetree_palcement_entity_id Integer NOT NULL,
 sitetree_placement_id Integer NOT NULL,
 position_rack Smallint  NOT NULL
         CONSTRAINT cms_sitetree_rackspace_position_rack_check CHECK (position_rack >= 0),
 position_u Smallint  NOT NULL
         CONSTRAINT cms_sitetree_rackspace_position_u_check CHECK (position_u >= 1),
 position_front Boolean Default True NOT NULL,
 CONSTRAINT cms_sitetree_rackspace_position_entity_id_fk_co FOREIGN KEY (sitetree_palcement_entity_id) REFERENCES "lscms_cms_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_sitetree_rackspace_position_palcement_id_fk_co FOREIGN KEY (sitetree_placement_id) REFERENCES "lscms_cms_sitetree_placement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;


CREATE SEQUENCE cms_widget_dataprovider_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_widget_dataprovider
(
    id integer NOT NULL DEFAULT nextval('cms_widget_dataprovider_id_seq'::regclass),
    name character varying(50) NOT NULL,
    widgettype_id integer NOT NULL,
    CONSTRAINT cms_widget_dataprovider_pkey PRIMARY KEY (id),
    CONSTRAINT cms_widget_dataprovider_widgettype_id_fk FOREIGN KEY (widgettype_id)
        REFERENCES lscms_common_code (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);
ALTER SEQUENCE cms_widget_dataprovider_id_seq OWNED BY lscms_cms_widget_dataprovider.id
;


CREATE TABLE lscms_cms_linkage_connection_invalid(
 linkage_connection_id Integer NOT NULL,
 basispatchpanel_id  Integer,
 x Integer NOT NULL,
 y Integer NOT NULL,
 nodeid Integer,
 port Integer,
 category_id Integer,
 CONSTRAINT cms_linkage_connection_invalid_linkage_connection_id_fk_co FOREIGN KEY (linkage_connection_id) REFERENCES "lscms_cms_linkage_connection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_invalid_basispatchpanel_id_fk FOREIGN KEY (basispatchpanel_id) REFERENCES "lscms_cms_sitetree" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_invalid_connector_id_fk_co FOREIGN KEY (category_id) REFERENCES "lscms_cms_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;

CREATE TABLE lscms_ipam_network_switch(
 network_id Integer NOT NULL,
 type_id Integer NOT NULL, --l3 switch, gateway
 opm_name Character varying(50) NOT NULL,
 ip Inet NOT NULL,
 CONSTRAINT ipam_network_switch_network_id_fk_co FOREIGN KEY (network_id) REFERENCES "lscms_ipam_network" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT ipam_network_switch_type_id_fk_co FOREIGN KEY (type_id) REFERENCES "lscms_common_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
 );

CREATE TABLE lscms_mac_to_port_temp
(
     peer_mac_address character varying(50),
     port_no character varying(10),
     switch_name character varying(50)
);
CREATE SEQUENCE ipam_unmanaged_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_ipam_unmanaged(
 id Integer DEFAULT nextval('ipam_unmanaged_id_seq'::regclass) NOT NULL,
 name Character varying(50),
 mac_address Macaddr NOT NULL,
 asset_tag Character varying(50),
 comments text,
 CONSTRAINT ipam_unmanaged_pkey PRIMARY KEY (id)
)
;
ALTER SEQUENCE ipam_unmanaged_id_seq OWNED BY lscms_ipam_unmanaged.id
;
ALTER TABLE lscms_ipam_unmanaged ADD CONSTRAINT ipam_unmanaged_mac_address_unique UNIQUE (mac_address)
;

CREATE TABLE lscms_cms_linkage_connection_interface_switchtopo(
 linkage_connection_id Integer NOT NULL,
 interface_a_id Integer NOT NULL,
 connector_id Integer NOT NULL,
 interface_b_id Integer NOT NULL,
 CONSTRAINT cms_linkage_connection_interface_switchtopo_linkage_connection_id_fk_co FOREIGN KEY (linkage_connection_id) REFERENCES "lscms_cms_linkage_connection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_switchtopo_connector_id_fk_co FOREIGN KEY (connector_id) REFERENCES "lscms_cms_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_switchtopo_interface_a_id_fk_co FOREIGN KEY (interface_a_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
 CONSTRAINT cms_linkage_connection_interface_switchtopo_interface_b_id_fk_co FOREIGN KEY (interface_b_id) REFERENCES "lscms_cms_interface" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
;
CREATE INDEX cms_linkage_connection_interface_switchtopo_interface_a_id ON lscms_cms_linkage_connection_interface_switchtopo (interface_a_id);
CREATE INDEX cms_linkage_connection_interface_switchtopo_interface_b_id ON lscms_cms_linkage_connection_interface_switchtopo (interface_b_id);

CREATE SEQUENCE ipam_accessstat_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
    
CREATE TABLE lscms_ipam_accessstat
(
    id integer NOT NULL DEFAULT nextval('ipam_accessstat_id_seq'::regclass),
    stat_date character varying(8) NOT NULL, --20181031
    stat_hr character varying(2) NOT NULL, --00
    site_id  integer NOT NULL ,
    building_id  integer NOT NULL ,
    floor_id  integer NOT NULL ,
    area_id  integer NOT NULL ,
    enduser_cnt integer not null,
    enduser_duration integer not null,
    created date NOT NULL DEFAULT ('now'::text)::date,
    is_deleted boolean DEFAULT false,
    CONSTRAINT ipam_accessstat_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE ipam_accessstat_id_seq OWNED BY lscms_ipam_accessstat.id
;
CREATE INDEX lscms_ipam_accessstat_stat_date_idx
    ON lscms_ipam_accessstat 
    (stat_date);

CREATE INDEX lscms_ipam_accessstat_site_id_idx
    ON lscms_ipam_accessstat
    (site_id);

CREATE INDEX lscms_ipam_accessstat_building_id_idx
    ON public.lscms_ipam_accessstat 
    (building_id);

CREATE INDEX lscms_ipam_accessstat_floor_id_idx
    ON public.lscms_ipam_accessstat
    (floor_id);

CREATE TABLE lscms_ipam_temp_user
(
    mac_address Macaddr NOT NULL,
    ip_address Inet NOT NULL,
    system_name character varying(50) NOT NULL,
    created date NOT NULL DEFAULT ('now'::text)::date,
    is_deleted boolean DEFAULT false
);

CREATE TABLE lscms_ipam_enduser_mac
(
    mac_address Macaddr NOT NULL,
    enduser_id Integer NOT NULL,
    created date NOT NULL DEFAULT ('now'::text)::date,
    is_deleted boolean DEFAULT false,
    CONSTRAINT enduser_enduser_id_fk FOREIGN KEY (enduser_id) REFERENCES "lscms_ipam_enduser" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT enduser_mac_mac_address_uniq UNIQUE (mac_address)
);

CREATE SEQUENCE cms_category_3d_texture_id_seq
 INCREMENT BY 1
 NO MAXVALUE
 NO MINVALUE
 CACHE 1
 START 1001
;
CREATE TABLE lscms_cms_category_3d_texture
(
    id integer NOT NULL DEFAULT nextval('cms_category_3d_texture_id_seq'::regclass),
    is_deleted boolean DEFAULT false,
    created date NOT NULL DEFAULT ('now'::text)::date,
    last_updated timestamp with time zone NOT NULL DEFAULT now(),
    image_rack_front text,
    image_rack_rear text,
    category_id Integer not null,
    CONSTRAINT cms_category_3d_texture_pkey PRIMARY KEY (id),
    CONSTRAINT cms_category_3d_texture_category_id_fk FOREIGN KEY (category_id)
        REFERENCES lscms_cms_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);
ALTER SEQUENCE cms_category_3d_texture_id_seq OWNED BY lscms_cms_category_3d_texture.id;



CREATE OR REPLACE VIEW public.lscms_view_enduser AS
 SELECT x.id, x.name, x.empno, x.full_name, x.contact, x.email, x.asset_tag,
    y.mac_address, x.ip_address reg_ip_address
   FROM lscms_ipam_enduser x, lscms_ipam_enduser_mac y
  WHERE x.id = y.enduser_id AND y.is_deleted = false;

ALTER TABLE public.lscms_view_enduser
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_cmsinfo AS
 WITH RECURSIVE topdownsearchtree AS (
                 SELECT a.id, a.site_id, a.type_id, a.level, a.level_rank, 
                    a.entity_id, a.parent_id, ARRAY[]::integer[] AS linkagepath
                   FROM lscms_cms_sitetree a, lscms_cms_site b
                  WHERE a.site_id = b.id AND a.parent_id IS NULL AND b.is_deleted = false
        UNION ALL 
                 SELECT a.id, a.site_id, a.type_id, a.level, a.level_rank, 
                    a.entity_id, a.parent_id, 
                    array_append(b.linkagepath, ( SELECT lscms_cms_entity.id
                           FROM lscms_cms_entity
                          WHERE lscms_cms_entity.id = (( SELECT lscms_cms_sitetree.entity_id
                                   FROM lscms_cms_sitetree
                                  WHERE lscms_cms_sitetree.id = a.parent_id)))) AS array_append
                   FROM lscms_cms_sitetree a, topdownsearchtree b
                  WHERE a.parent_id = b.id
        )
 SELECT t.id, t.site_id, t.entity_name, t.entity_asset_tag, t.entity_comments, 
    t.entity_opm_name, t.entity_ip, t.site_name, t.site_description, 
    t.region_name, t.type_id, t.port_no, t.mac_address, t.ifindex, 
    t.description, t.type_name, t.ci_id, t.ci_name, t.ci_description, 
    tt.bld_entity_id, tt.bld_entity_name, tt.floor_entity_id, 
    tt.floor_entity_name, tt.area_entity_id, tt.area_entity_name, 
    array_to_string(tt.linkagepath, '>>'::text) AS location
   FROM ( SELECT a.id, b.site_id, a.name AS entity_name, 
            a.asset_tag AS entity_asset_tag, a.comments AS entity_comments, 
            a.opm_name AS entity_opm_name, a.ip AS entity_ip, 
            c.name AS site_name, c.description AS site_description, 
            d.name AS region_name, b.type_id, f.name AS port_no, f.mac_address, 
            f.ifindex, f.description, 
            ( SELECT lscms_common_code.name
                   FROM lscms_common_code
                  WHERE lscms_common_code.group_id = (( SELECT lscms_common_code.id
                           FROM lscms_common_code
                          WHERE lscms_common_code.group_id IS NULL AND lscms_common_code.name::text = 'CMS Category Type'::text)) AND lscms_common_code.id = b.type_id) AS type_name, 
            e.id AS ci_id, e.name AS ci_name, e.description AS ci_description
           FROM lscms_cms_entity a, lscms_cms_sitetree b, lscms_cms_site c, 
            lscms_cms_region d, lscms_cms_category e, lscms_cms_interface f
          WHERE a.id = b.entity_id AND b.site_id = c.id AND a.is_deleted = false AND c.is_deleted = false AND c.region_id = d.id AND a.category_id = e.id AND a.id = f.entity_id AND f.mac_address IS NOT NULL) t, 
    ( SELECT y.site_id, y.site_name, max(yy.bld_entity_id) AS bld_entity_id, 
            max(yy.bld_entity_name::text) AS bld_entity_name, 
            max(yyy.floor_entity_id) AS floor_entity_id, 
            max(yyy.floor_entity_name::text) AS floor_entity_name, 
            max(yyyy.area_entity_id) AS area_entity_id, 
            max(yyyy.area_entity_name::text) AS area_entity_name, 
            max(y.linkagepath) AS linkagepath, y.entity_id
           FROM ( SELECT t.site_id, t.site_name, t.sitetree_id, 
                    t.sitetree_parent_id, t.entity_id, t.total_port, 
                    t.entity_name, tt.linkagepath, 
                    unnest(tt.linkagepath) AS parent_tree_id
                   FROM ( SELECT b.id AS sitetree_id, 
                            b.parent_id AS sitetree_parent_id, 
                            a.id AS entity_id, d.total_port, b.site_id, 
                            a.name AS entity_name, c.name AS site_name
                           FROM lscms_cms_entity a, lscms_cms_sitetree b, 
                            lscms_cms_site c, lscms_cms_category d
                          WHERE 1 = 1 AND a.category_id = d.id AND b.entity_id = a.id AND b.site_id = c.id AND a.is_deleted = false AND c.is_deleted = false AND (d.type_id IN ( SELECT lscms_common_code.id
                                   FROM lscms_common_code
                                  WHERE lscms_common_code.group_id = (( SELECT lscms_common_code.id
                                           FROM lscms_common_code
                                          WHERE lscms_common_code.group_id IS NULL AND lscms_common_code.name::text = 'CMS Category Type'::text)) AND (lscms_common_code.name::text <> ALL (ARRAY['Site'::character varying::text, 'Building'::character varying::text, 'Floor'::character varying::text, 'Area'::character varying::text]))))) t, 
                    topdownsearchtree tt
                  WHERE t.sitetree_id = tt.id) y
      LEFT JOIN ( SELECT a.id AS bld_entity_id, a.name AS bld_entity_name
                   FROM lscms_cms_entity a, lscms_cms_category b, 
                    lscms_common_code c
                  WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Building'::text) yy ON y.parent_tree_id = yy.bld_entity_id
   LEFT JOIN ( SELECT a.id AS floor_entity_id, a.name AS floor_entity_name
              FROM lscms_cms_entity a, lscms_cms_category b, 
               lscms_common_code c
             WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Floor'::text) yyy ON y.parent_tree_id = yyy.floor_entity_id
   LEFT JOIN ( SELECT a.id AS area_entity_id, a.name AS area_entity_name
         FROM lscms_cms_entity a, lscms_cms_category b, lscms_common_code c
        WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Area'::text) yyyy ON y.parent_tree_id = yyyy.area_entity_id
  WHERE 1 = 1
  GROUP BY y.site_id, y.site_name, y.entity_id) tt
  WHERE t.id = tt.entity_id;

ALTER TABLE public.lscms_view_cmsinfo
    OWNER TO postgres;

CREATE OR REPLACE VIEW public.lscms_view_cmsinfo_device AS
 WITH RECURSIVE topdownsearchtree AS (
                 SELECT a.id, a.site_id, a.type_id, a.level, a.level_rank, 
                    a.entity_id, a.parent_id, ARRAY[]::integer[] AS linkagepath, 
                    ARRAY[]::text[] AS linkagepathname
                   FROM lscms_cms_sitetree a, lscms_cms_site b
                  WHERE a.site_id = b.id AND a.parent_id IS NULL AND b.is_deleted = false
        UNION ALL 
                 SELECT a.id, a.site_id, a.type_id, a.level, a.level_rank, 
                    a.entity_id, a.parent_id, 
                    array_append(b.linkagepath, ( SELECT lscms_cms_entity.id
                           FROM lscms_cms_entity
                          WHERE lscms_cms_entity.id = (( SELECT lscms_cms_sitetree.entity_id
                                   FROM lscms_cms_sitetree
                                  WHERE lscms_cms_sitetree.id = a.parent_id)))) AS array_append, 
                    array_append(b.linkagepathname, ( SELECT lscms_cms_entity.name::text AS name
                           FROM lscms_cms_entity
                          WHERE lscms_cms_entity.id = (( SELECT lscms_cms_sitetree.entity_id
                                   FROM lscms_cms_sitetree
                                  WHERE lscms_cms_sitetree.id = a.parent_id)))) AS array_append
                   FROM lscms_cms_sitetree a, topdownsearchtree b
                  WHERE a.parent_id = b.id
        )
 SELECT t.id, t.site_id, t.entity_name, t.entity_asset_tag, t.entity_comments, 
    t.entity_opm_name, t.entity_ip, t.site_name, t.site_description, 
    t.region_name, t.type_id, t.type_name, t.ci_id, t.ci_name, t.ci_description, 
    tt.bld_entity_id, tt.bld_entity_name, tt.floor_entity_id, 
    tt.floor_entity_name, tt.area_entity_id, tt.area_entity_name, 
    array_to_string(tt.linkagepath, '>>'::text) AS location2, 
    array_to_string(tt.linkagepathname, '>>'::text) AS location
   FROM ( SELECT a.id, b.site_id, a.name AS entity_name, 
            a.asset_tag AS entity_asset_tag, a.comments AS entity_comments, 
            a.opm_name AS entity_opm_name, a.ip AS entity_ip, 
            c.name AS site_name, c.description AS site_description, 
            d.name AS region_name, b.type_id, 
            ( SELECT lscms_common_code.name
                   FROM lscms_common_code
                  WHERE lscms_common_code.group_id = (( SELECT lscms_common_code.id
                           FROM lscms_common_code
                          WHERE lscms_common_code.group_id IS NULL AND lscms_common_code.name::text = 'CMS Category Type'::text)) AND lscms_common_code.id = b.type_id) AS type_name, 
            e.id AS ci_id, e.name AS ci_name, e.description AS ci_description
           FROM lscms_cms_entity a, lscms_cms_sitetree b, lscms_cms_site c, 
            lscms_cms_region d, lscms_cms_category e
          WHERE a.id = b.entity_id AND b.site_id = c.id AND a.is_deleted = false AND c.region_id = d.id AND a.category_id = e.id) t, 
    ( SELECT y.site_id, y.site_name, max(yy.bld_entity_id) AS bld_entity_id, 
            max(yy.bld_entity_name::text) AS bld_entity_name, 
            max(yyy.floor_entity_id) AS floor_entity_id, 
            max(yyy.floor_entity_name::text) AS floor_entity_name, 
            max(yyyy.area_entity_id) AS area_entity_id, 
            max(yyyy.area_entity_name::text) AS area_entity_name, 
            max(y.linkagepath) AS linkagepath, 
            max(y.linkagepathname) AS linkagepathname, y.entity_id
           FROM ( SELECT t.site_id, t.site_name, t.sitetree_id, 
                    t.sitetree_parent_id, t.entity_id, t.total_port, 
                    t.entity_name, tt.linkagepath, tt.linkagepathname, 
                    unnest(tt.linkagepath) AS parent_tree_id
                   FROM ( SELECT b.id AS sitetree_id, 
                            b.parent_id AS sitetree_parent_id, 
                            a.id AS entity_id, d.total_port, b.site_id, 
                            a.name AS entity_name, c.name AS site_name
                           FROM lscms_cms_entity a, lscms_cms_sitetree b, 
                            lscms_cms_site c, lscms_cms_category d
                          WHERE 1 = 1 AND a.category_id = d.id AND b.entity_id = a.id AND b.site_id = c.id AND a.is_deleted = false AND c.is_deleted = false AND (d.type_id IN ( SELECT lscms_common_code.id
                                   FROM lscms_common_code
                                  WHERE lscms_common_code.group_id = (( SELECT lscms_common_code.id
                                           FROM lscms_common_code
                                          WHERE lscms_common_code.group_id IS NULL AND lscms_common_code.name::text = 'CMS Category Type'::text)) AND (lscms_common_code.name::text <> ALL (ARRAY['Site'::character varying::text, 'Building'::character varying::text, 'Floor'::character varying::text, 'Area'::character varying::text]))))) t, 
                    topdownsearchtree tt
                  WHERE t.sitetree_id = tt.id) y
      LEFT JOIN ( SELECT a.id AS bld_entity_id, a.name AS bld_entity_name
                   FROM lscms_cms_entity a, lscms_cms_category b, 
                    lscms_common_code c
                  WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Building'::text) yy ON y.parent_tree_id = yy.bld_entity_id
   LEFT JOIN ( SELECT a.id AS floor_entity_id, a.name AS floor_entity_name
              FROM lscms_cms_entity a, lscms_cms_category b, 
               lscms_common_code c
             WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Floor'::text) yyy ON y.parent_tree_id = yyy.floor_entity_id
   LEFT JOIN ( SELECT a.id AS area_entity_id, a.name AS area_entity_name
         FROM lscms_cms_entity a, lscms_cms_category b, lscms_common_code c
        WHERE a.category_id = b.id AND b.type_id = c.id AND c.name::text = 'Area'::text) yyyy ON y.parent_tree_id = yyyy.area_entity_id
  WHERE 1 = 1
  GROUP BY y.site_id, y.site_name, y.entity_id) tt
  WHERE t.id = tt.entity_id;

ALTER TABLE public.lscms_view_cmsinfo_device
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_cmsinfo_interface AS
 SELECT t.id, t.site_id, t.entity_name, t.entity_asset_tag, t.entity_comments, 
    t.entity_opm_name, t.entity_ip, t.site_name, t.site_description, 
    t.region_name, t.type_id, t.port_no, t.mac_address, t.ifindex, 
    t.description, t.type_name, t.ci_id, t.ci_name, t.ci_description, 
    tt.bld_entity_id, tt.bld_entity_name, tt.floor_entity_id, 
    tt.floor_entity_name, tt.area_entity_id, tt.area_entity_name, tt.location
   FROM lscms_view_cmsinfo_device tt, 
    ( SELECT a.id, b.site_id, a.name AS entity_name, 
            a.asset_tag AS entity_asset_tag, a.comments AS entity_comments, 
            a.opm_name AS entity_opm_name, a.ip AS entity_ip, 
            c.name AS site_name, c.description AS site_description, 
            d.name AS region_name, b.type_id, f.name AS port_no, f.mac_address, 
            f.ifindex, f.description, 
            ( SELECT lscms_common_code.name
                   FROM lscms_common_code
                  WHERE lscms_common_code.group_id = (( SELECT lscms_common_code.id
                           FROM lscms_common_code
                          WHERE lscms_common_code.group_id IS NULL AND lscms_common_code.name::text = 'CMS Category Type'::text)) AND lscms_common_code.id = b.type_id) AS type_name, 
            e.id AS ci_id, e.name AS ci_name, e.description AS ci_description
           FROM lscms_cms_entity a, lscms_cms_sitetree b, lscms_cms_site c, 
            lscms_cms_region d, lscms_cms_category e, lscms_cms_interface f
          WHERE a.id = b.entity_id AND b.site_id = c.id AND a.is_deleted = false AND c.is_deleted = false AND c.region_id = d.id AND a.category_id = e.id AND a.id = f.entity_id AND f.mac_address IS NOT NULL) t
  WHERE t.id = tt.id;

ALTER TABLE public.lscms_view_cmsinfo_interface
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_connectioninfo AS
 WITH connectioninfo AS (
         SELECT x.port_no, x.switch_name, x.ifindex, x.macaddress, x.ifname, 
            y.peer_mac_address, y.peer_ip_address
           FROM ( SELECT a.port_no, a.switch_name, b.ifindex, 
                    replace(upper(b.physaddr::text), ' '::text, ':'::text) AS macaddress, 
                    b.ifname
                   FROM lscms_port_to_ifindex a, snmpinterface b, ipaddress c
                  WHERE 1 = 1 AND a.if_index::integer = b.ifindex AND b.name::text = c.name::text AND a.switch_name::text = c.parentnode::text
                  ORDER BY a.switch_name, b.ifindex) x, 
            ( SELECT b.switch_name, b.port_no, b.peer_mac_address, 
                    a.ip_address AS peer_ip_address
			        from lscms_mac_to_port b left join lscms_mac_to_ip a
					on b.peer_mac_address::text=a.mac_address::text
                  ORDER BY b.switch_name, b.port_no) y
          WHERE x.switch_name::text = y.switch_name::text AND x.port_no::text = y.port_no::text
        )
 SELECT connectioninfo.port_no, connectioninfo.switch_name, 
    connectioninfo.ifindex, connectioninfo.macaddress, connectioninfo.ifname, 
    connectioninfo.peer_mac_address, connectioninfo.peer_ip_address
   FROM connectioninfo;

ALTER TABLE public.lscms_view_connectioninfo
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection AS
 WITH RECURSIVE topdownsearchtree AS (
                 SELECT lscms_cms_linkage_connection_interface.interface_a_id, 
                    lscms_cms_linkage_connection_interface.linkage_connection_id, 
                    lscms_cms_linkage_connection_interface.interface_b_id, 
                    lscms_cms_linkage_connection_interface.interface_b_id || ''::text AS connection_list
                   FROM lscms_cms_linkage_connection_interface
                  WHERE NOT (lscms_cms_linkage_connection_interface.interface_b_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_a_id
                           FROM lscms_cms_linkage_connection_interface))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    (x.interface_b_id || ' > '::text) || y.connection_list
                   FROM lscms_cms_linkage_connection_interface x, 
                    topdownsearchtree y
                  WHERE x.interface_b_id = y.interface_a_id
        )
 SELECT topdownsearchtree.interface_a_id, 
    topdownsearchtree.linkage_connection_id, topdownsearchtree.interface_b_id, 
    topdownsearchtree.connection_list
   FROM topdownsearchtree;

ALTER TABLE public.lscms_view_linkage_connection
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection_all AS
 WITH RECURSIVE bottomuptree AS (
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    x.interface_a_id || ''::text AS connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x
                  WHERE NOT (x.interface_a_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_b_id
                           FROM lscms_cms_linkage_connection_interface
                          WHERE lscms_cms_linkage_connection_interface.linkage_connection_id = x.linkage_connection_id))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    (y.connection_list || ' '::text) || x.interface_a_id
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x, 
                    bottomuptree y
                  WHERE x.interface_a_id = y.interface_b_id AND x.linkage_connection_id = y.linkage_connection_id
        ), topdownsearchtree AS (
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    x.interface_b_id || ''::text AS connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x
                  WHERE NOT (x.interface_b_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_a_id
                           FROM lscms_cms_linkage_connection_interface
                          WHERE lscms_cms_linkage_connection_interface.linkage_connection_id = x.linkage_connection_id))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    (x.interface_b_id || ' '::text) || y.connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x, 
                    topdownsearchtree y
                  WHERE x.interface_b_id = y.interface_a_id AND x.linkage_connection_id = y.linkage_connection_id
        )
 SELECT DISTINCT xx.connection_list, xx.linkage_connection_id, 
    xx.interface_a_id, xx.interface_b_id, xx.yinterface_a_id, 
    xx.yinterface_b_id
   FROM (        (         SELECT (((y.connection_list || ' '::text) || x.interface_a_id) || ' '::text) || x.connection_list AS connection_list, 
                            x.linkage_connection_id, x.interface_a_id, 
                            x.interface_b_id, 
                            y.interface_a_id AS yinterface_a_id, 
                            y.interface_b_id AS yinterface_b_id
                           FROM topdownsearchtree x, bottomuptree y
                          WHERE x.interface_a_id = y.interface_b_id AND x.linkage_connection_id = y.linkage_connection_id
                UNION ALL 
                         SELECT (x.interface_a_id || ' '::text) || x.connection_list AS connection_list, 
                            x.linkage_connection_id, x.interface_a_id, 
                            x.interface_b_id, 0 AS yinterface_a_id, 
                            0 AS yinterface_b_id
                           FROM topdownsearchtree x
                          WHERE NOT (x.interface_a_id IN ( SELECT bottomuptree.interface_b_id
                                   FROM bottomuptree
                                  WHERE bottomuptree.linkage_connection_id = x.linkage_connection_id)))
        UNION ALL 
                 SELECT (x.connection_list || ' '::text) || x.interface_b_id AS connection_list, 
                    x.linkage_connection_id, 0 AS interface_a_id, 
                    0 AS interface_b_id, x.interface_a_id AS yinterface_a_id, 
                    x.interface_b_id AS yinterface_b_id
                   FROM bottomuptree x
                  WHERE NOT (x.interface_b_id IN ( SELECT topdownsearchtree.interface_a_id
                           FROM topdownsearchtree
                          WHERE topdownsearchtree.linkage_connection_id = x.linkage_connection_id))) xx;

ALTER TABLE public.lscms_view_linkage_connection_all
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection_all_array AS
 WITH RECURSIVE bottomuptree AS (
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    ARRAY[x.interface_a_id] AS connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x
                  WHERE NOT (x.interface_a_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_b_id
                           FROM lscms_cms_linkage_connection_interface
                          WHERE lscms_cms_linkage_connection_interface.linkage_connection_id = x.linkage_connection_id))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, y.connection_list || x.interface_a_id
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x, 
                    bottomuptree y
                  WHERE x.interface_a_id = y.interface_b_id AND x.linkage_connection_id = y.linkage_connection_id
        ), topdownsearchtree AS (
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    ARRAY[x.interface_b_id] AS connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x
                  WHERE NOT (x.interface_b_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_a_id
                           FROM lscms_cms_linkage_connection_interface
                          WHERE lscms_cms_linkage_connection_interface.linkage_connection_id = x.linkage_connection_id))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, x.interface_b_id || y.connection_list
                   FROM ( SELECT t.linkage_connection_id, t.interface_a_id, 
                            t.connector_id, t.interface_b_id
                           FROM lscms_cms_linkage_connection_interface t, 
                            lscms_cms_sitetree xx, lscms_cms_site xxx, 
                            lscms_cms_interface xxxx, lscms_cms_entity xxxxx
                          WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false) x, 
                    topdownsearchtree y
                  WHERE x.interface_b_id = y.interface_a_id AND x.linkage_connection_id = y.linkage_connection_id
        )
 SELECT xxx.connection_list, xxx.linkage_connection_id, xxx.interface_a_id, 
    xxx.interface_b_id, xxx.yinterface_a_id, xxx.yinterface_b_id, y.id, y.name, 
    y.entity_id, y.mac_address, y.mtu, y.description, y.enabled, y.ifindex, 
    y.switch_name, y.ip, y.site_id, y.node_id
   FROM ( SELECT DISTINCT ON (xx.connection_list, xx.linkage_connection_id) xx.connection_list, 
            xx.linkage_connection_id, xx.interface_a_id, xx.interface_b_id, 
            xx.yinterface_a_id, xx.yinterface_b_id
           FROM (        (         SELECT (y.connection_list || x.interface_a_id) || x.connection_list AS connection_list, 
                                    x.linkage_connection_id, x.interface_a_id, 
                                    x.interface_b_id, 
                                    y.interface_a_id AS yinterface_a_id, 
                                    y.interface_b_id AS yinterface_b_id
                                   FROM topdownsearchtree x, bottomuptree y
                                  WHERE x.interface_a_id = y.interface_b_id AND x.linkage_connection_id = y.linkage_connection_id
                        UNION ALL 
                                 SELECT x.interface_a_id || x.connection_list AS connection_list, 
                                    x.linkage_connection_id, x.interface_a_id, 
                                    x.interface_b_id, 0 AS yinterface_a_id, 
                                    0 AS yinterface_b_id
                                   FROM topdownsearchtree x
                                  WHERE NOT (x.interface_a_id IN ( SELECT bottomuptree.interface_b_id
                                           FROM bottomuptree
                                          WHERE bottomuptree.linkage_connection_id = x.linkage_connection_id)))
                UNION ALL 
                         SELECT x.connection_list || x.interface_b_id AS connection_list, 
                            x.linkage_connection_id, 0 AS interface_a_id, 
                            0 AS interface_b_id, 
                            x.interface_a_id AS yinterface_a_id, 
                            x.interface_b_id AS yinterface_b_id
                           FROM bottomuptree x
                          WHERE NOT (x.interface_b_id IN ( SELECT topdownsearchtree.interface_a_id
                                   FROM topdownsearchtree
                                  WHERE topdownsearchtree.linkage_connection_id = x.linkage_connection_id))) xx) xxx, 
    ( SELECT xx.id, xx.name, xx.entity_id, xx.mac_address, xx.mtu, xx.description, 
            xx.enabled, xx.ifindex, yy.name AS switch_name, yy.ip, zz.site_id, 
            zz.id AS node_id
           FROM lscms_cms_interface xx, lscms_cms_entity yy, 
            lscms_cms_sitetree zz
          WHERE xx.entity_id = yy.id AND yy.id = zz.entity_id) y
  WHERE y.id = ANY (xxx.connection_list);

ALTER TABLE public.lscms_view_linkage_connection_all_array
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection_bottomup AS
 WITH RECURSIVE bottomuptree AS (
                 SELECT lscms_cms_linkage_connection_interface.interface_a_id, 
                    lscms_cms_linkage_connection_interface.linkage_connection_id, 
                    lscms_cms_linkage_connection_interface.interface_b_id, 
                    lscms_cms_linkage_connection_interface.interface_a_id || ''::text AS connection_list
                   FROM lscms_cms_linkage_connection_interface
                  WHERE NOT (lscms_cms_linkage_connection_interface.interface_a_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_b_id
                           FROM lscms_cms_linkage_connection_interface))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    (y.connection_list || ' '::text) || x.interface_a_id
                   FROM lscms_cms_linkage_connection_interface x, 
                    bottomuptree y
                  WHERE x.interface_a_id = y.interface_b_id
        )
 SELECT bottomuptree.interface_a_id, bottomuptree.linkage_connection_id, 
    bottomuptree.interface_b_id, bottomuptree.connection_list
   FROM bottomuptree;

ALTER TABLE public.lscms_view_linkage_connection_bottomup
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection_topdown AS
 WITH RECURSIVE topdownsearchtree AS (
                 SELECT lscms_cms_linkage_connection_interface.interface_a_id, 
                    lscms_cms_linkage_connection_interface.linkage_connection_id, 
                    lscms_cms_linkage_connection_interface.interface_b_id, 
                    lscms_cms_linkage_connection_interface.interface_b_id || ''::text AS connection_list
                   FROM lscms_cms_linkage_connection_interface
                  WHERE NOT (lscms_cms_linkage_connection_interface.interface_b_id IN ( SELECT lscms_cms_linkage_connection_interface.interface_a_id
                           FROM lscms_cms_linkage_connection_interface))
        UNION ALL 
                 SELECT x.interface_a_id, x.linkage_connection_id, 
                    x.interface_b_id, 
                    (x.interface_b_id || ' '::text) || y.connection_list
                   FROM lscms_cms_linkage_connection_interface x, 
                    topdownsearchtree y
                  WHERE x.interface_b_id = y.interface_a_id
        )
 SELECT topdownsearchtree.interface_a_id, 
    topdownsearchtree.linkage_connection_id, topdownsearchtree.interface_b_id, 
    topdownsearchtree.connection_list
   FROM topdownsearchtree;

ALTER TABLE public.lscms_view_linkage_connection_topdown
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_linkage_connection_valid_interface AS
 SELECT t.linkage_connection_id, t.interface_a_id, t.connector_id, 
    t.interface_b_id
   FROM lscms_cms_linkage_connection_interface t, lscms_cms_sitetree xx, 
    lscms_cms_site xxx, lscms_cms_interface xxxx, lscms_cms_entity xxxxx
  WHERE xxxx.entity_id = xxxxx.id AND xxxxx.is_deleted = false AND t.interface_a_id = xxxx.id AND xxxx.entity_id = xx.entity_id AND xx.site_id = xxx.id AND xxx.is_deleted = false;

ALTER TABLE public.lscms_view_linkage_connection_valid_interface
    OWNER TO postgres;


CREATE OR REPLACE VIEW public.lscms_view_unauthorized AS
 SELECT x.switch_name, z.entity_opm_name AS switch_opm_name, 
    z.entity_ip AS switch_ip, x.ifindex, x.ifname, z.port_no AS switch_port, 
    upper(z.mac_address::text) AS switch_mac, z.description AS switch_port_desc, 
    x.peer_ip_address AS enduser_ip, x.peer_mac_address AS enduser_mac
   FROM lscms_view_connectioninfo x
   LEFT JOIN (         SELECT lscms_view_enduser.mac_address
                   FROM lscms_view_enduser
        UNION ALL 
                 SELECT lscms_ipam_unmanaged.mac_address
                   FROM lscms_ipam_unmanaged) y ON upper(x.peer_mac_address::text) = upper(y.mac_address::text)
   JOIN lscms_view_cmsinfo_interface z ON upper(x.macaddress) = upper(z.mac_address::text)
  WHERE y.mac_address IS NULL;

ALTER TABLE public.lscms_view_unauthorized
    OWNER TO postgres;



CREATE OR REPLACE VIEW public.lscms_view_authorized AS
 SELECT x.id, x.name, x.empno, x.full_name, x.contact, x.email, x.asset_tag, 
    x.mac_address, 
        CASE
            WHEN y.mac_address IS NOT NULL THEN 'Connected'::text
            ELSE 'Disconnected'::text
        END AS status, 
    y.entity_opm_name AS switch_opm_name, y.entity_name AS switch_name, 
    y.port_no AS switch_port, upper(y.mac_address::text) AS switch_mac, 
    y.description AS switch_port_desc, y.ip_address::text AS enduser_ip, 
    y.access_time AS connected_since
   FROM lscms_view_enduser x
   LEFT JOIN ( SELECT a.id, a.site_id, a.entity_name, a.entity_asset_tag, 
            a.entity_comments, a.entity_opm_name, a.entity_ip, a.site_name, 
            a.site_description, a.region_name, a.type_id, a.port_no, 
            a.mac_address, a.ifindex, a.description, a.type_name, a.ci_id, 
            a.ci_name, a.ci_description, a.bld_entity_id, a.bld_entity_name, 
            a.floor_entity_id, a.floor_entity_name, a.area_entity_id, 
            a.area_entity_name, a.location, b.ip_address, b.enduser_name, 
            b.enduser_mac, b.access_time
           FROM lscms_view_cmsinfo_interface a, lscms_ipam_accesslist b
          WHERE a.mac_address = b.mac_address) y ON x.name::text = y.enduser_name::text AND x.mac_address = y.enduser_mac;

ALTER TABLE public.lscms_view_authorized
    OWNER TO postgres;
