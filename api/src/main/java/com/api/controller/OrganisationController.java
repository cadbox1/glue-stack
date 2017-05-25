package com.api.controller;

import com.api.domain.entity.Organisation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 23/5/17.
 */
@RestController
@RequestMapping("api/organisations")
public class OrganisationController extends BaseController<Organisation, Integer> {
}
